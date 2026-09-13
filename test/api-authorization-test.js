const http = require("http");

const authenticatedStudentId = 1024;

const server = http.createServer((req, res) => {
  const match = req.url.match(/^\/api\/payments\/(\d+)$/);

  if (!match) {
    res.writeHead(404);
    return res.end("Not Found");
  }

  const requestedStudentId = Number(match[1]);

  // Control de autorizacion a nivel de objeto
  if (requestedStudentId !== authenticatedStudentId) {
    res.writeHead(403, { "Content-Type": "application/json" });
    return res.end(
      JSON.stringify({
        error: "Acceso no autorizado"
      })
    );
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      studentId: requestedStudentId,
      payments: []
    })
  );
});

server.listen(3000, "127.0.0.1", () => {
  console.log("=== API AUTHORIZATION TEST ===");
  console.log("Authenticated user: studentId=1024");
  console.log("Request: GET /api/payments/2048");
  console.log("Expected: 403 Forbidden");

  http.get("http://127.0.0.1:3000/api/payments/2048", (res) => {
    console.log(`Actual: ${res.statusCode}`);

    if (res.statusCode === 403) {
      console.log("Result: PASS");
      console.log("Object-level authorization is working.");
      server.close(() => process.exit(0));
    } else {
      console.log("Result: FAIL");
      console.log("Authorization failure over object-level access.");
      server.close(() => process.exit(1));
    }
  });
});