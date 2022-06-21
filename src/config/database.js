module.exports = {
  dialect: 'postgres',
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  define: {
    timestamps: true,
    underscored: true,
  }

}

