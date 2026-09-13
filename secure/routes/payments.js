app.get("/api/payments/:studentId", authenticateUser, async (req, res) => {
  const requestedStudentId = Number(req.params.studentId);
  const authenticatedStudentId = Number(req.user.studentId);

  if (!Number.isInteger(requestedStudentId)) {
    return res.status(400).json({ error: "studentId invalido" });
  }

  if (requestedStudentId !== authenticatedStudentId) {
    return res.status(403).json({ error: "Acceso no autorizado" });
  }

  const query =
    "SELECT id, student_id, amount, payment_date, receipt_url " +
    "FROM payments WHERE student_id = $1";

  const result = await db.query(query, [requestedStudentId]);

  res.json(result.rows);
});