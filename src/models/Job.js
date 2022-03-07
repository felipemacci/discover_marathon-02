const Config = require('../db/config')

module.exports = {
    async get() {
        const Database = await Config()

        const jobs = await Database.all(`SELECT * FROM jobs`)

        await Database.close()

        return jobs.map(job => ({
                id: job.id,
                name: job.name,
                "daily-hours": job.daily_hours,
                "total-hours": job.total_hours,
                created_at: job.created_at
        }))
    },

    async update(updatedJob, jobId) {
        const Database = await Config()

        Database.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${jobId}`)

        await Database.close()
    },

    async delete(id) {
        const Database = await Config()

        await Database.run(`DELETE FROM jobs WHERE id = ${id}`)

        await Database.close()
    },

    async create(newJob) {
        const Database = await Config()

        await Database.run(`INSERT INTO jobs (
            name,
            daily_hours,
            total_hours,
            created_at
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob.created_at}
        )
        `)

        Database.close()
    }
}