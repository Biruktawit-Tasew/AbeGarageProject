(async () => {
  try {
    const result = await db.query("SHOW TABLES");
    console.log("Database connected! Tables:", result);
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();
