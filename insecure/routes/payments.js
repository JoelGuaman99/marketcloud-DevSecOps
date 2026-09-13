app.get("/api/payments/:studentId", authenticateUser, async (req, res) => {
  const studentId = req.params.studentId;

  const query =
    "SELECT id, student_id, amount, payment_date, receipt_url " +
    "FROM payments WHERE student_id = " + studentId;

  const result = await db.query(query);
  res.json(result.rows);
});