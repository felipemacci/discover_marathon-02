const Config = require('./config')

const initDb = {
    async init() {
        const Database = await Config()

        await Database.exec(`
            CREATE TABLE profile(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                avatar TEXT,
                monthly_budget INTEGER,
                days_per_week INTEGER,
                hours_per_day INTEGER,
                vacation_per_year INTEGER,
                value_hour INTEGER
            )
        `)

        await Database.exec(`
            CREATE TABLE jobs(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                daily_hours INTEGER,
                total_hours INTEGER,
                created_at DATETIME
            )
        `)

        await Database.run(`
            INSERT INTO profile(
                name,
                avatar,
                monthly_budget,
                days_per_week,
                hours_per_day,
                vacation_per_year,
                value_hour
            ) VALUES (
                "Felipe Macci",
                "https://github.com/felipemacci.png",
                2000,
                5,
                5,
                4,
                70
            )
        `)

        await Database.run(`
            INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "Pizzaria Guloso",
                2,
                1,
                1617514376018
            )
        `)

        await Database.run(`
            INSERT INTO jobs(
                name,
                daily_hours,
                total_hours,
                created_at
            ) VALUES (
                "OneTwo Project",
                3,
                47,
                1617514376018
            )
        `)

        await Database.close()
    }
}

initDb.init()