module.exports = {
    remainingDays(job) {
        const remainingDays = (job['total-hours'] / job['daily-hours']).toFixed()
    
        const creationDate = new Date(job.created_at)
        const dueDay = creationDate.getDate() + Number(remainingDays)
        const dueDateInMs = creationDate.setDate(dueDay)
    
        const timeDiffInMs = dueDateInMs - Date.now()
    
        const dayInMs = 1000 * 60 * 60 * 24
        const dayDiff = Math.floor(timeDiffInMs / dayInMs)
    
        return dayDiff
    },

    calculateBudget: (job, valueHour) => valueHour * job['total-hours']
}