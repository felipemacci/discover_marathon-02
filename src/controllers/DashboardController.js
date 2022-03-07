const Job = require('../models/Job')
const Profile = require('../models/Profile')
const JobUtils = require('../utils/JobUtils')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()

        let statusCount = {
            total: jobs.length,
            progress: 0,
            done: 0
        }

        let jobTotalHours = 0
    
        const updatedJobs = jobs.map(job => {
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            statusCount[status]++

            jobTotalHours = status == 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours
    
            return {
                ...job,
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile['value-hour'])
            }
        })

        const freeHours = profile['hours-per-day'] - jobTotalHours
    
        return res.render('index', { jobs: updatedJobs, profile: profile, statusCount, freeHours })
    }
}