const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 5010;

// Set default middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom routes - Rewrite URLs
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
    "/api/students": "/students",
    "/api/students/:id": "/students/:id",
    "/api/users": "/users",
  }),
);

// Custom middleware - Add timestamps
server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = new Date().toISOString();
    req.body.updatedAt = new Date().toISOString();
  }
  if (req.method === "PUT" || req.method === "PATCH") {
    req.body.updatedAt = new Date().toISOString();
  }
  next();
});

// Custom route - Tìm kiếm students theo tên
server.get("/api/students/search", (req, res) => {
  const { q } = req.query;
  const db = router.db;

  if (!q) {
    return res
      .status(400)
      .json({ error: 'Missing search query parameter "q"' });
  }

  const results = db
    .get("students")
    .filter(
      (student) =>
        student.firstName.toLowerCase().includes(q.toLowerCase()) ||
        student.lastName.toLowerCase().includes(q.toLowerCase()) ||
        student.email.toLowerCase().includes(q.toLowerCase()),
    )
    .value();

  res.json(results);
});

// Custom route - Lọc students theo giới tính
server.get("/api/students/gender/:gender", (req, res) => {
  const { gender } = req.params;
  const db = router.db;

  const results = db
    .get("students")
    .filter((student) => student.gender === gender)
    .value();

  res.json(results);
});

// Custom route - Lọc students theo thành phố
server.get("/api/students/city/:city", (req, res) => {
  const { city } = req.params;
  const db = router.db;

  const results = db
    .get("students")
    .filter(
      (student) => student.location.city.toLowerCase() === city.toLowerCase(),
    )
    .value();

  res.json(results);
});

// Custom route - Lấy thống kê
server.get("/api/stats", (req, res) => {
  const db = router.db;
  const students = db.get("students").value();

  const stats = {
    total: students.length,
    male: students.filter((s) => s.gender === "male").length,
    female: students.filter((s) => s.gender === "female").length,
    cities: [...new Set(students.map((s) => s.location.city))],
    averageAge: Math.round(
      students.reduce((sum, s) => sum + s.dob.age, 0) / students.length,
    ),
  };

  res.json(stats);
});

// Use default router
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 JSON Server đang chạy tại http://localhost:${PORT}`);
  console.log(`\n📚 API Endpoints:`);
  console.log(`  GET    http://localhost:${PORT}/api/students`);
  console.log(`  GET    http://localhost:${PORT}/api/students/:id`);
  console.log(`  POST   http://localhost:${PORT}/api/students`);
  console.log(`  PUT    http://localhost:${PORT}/api/students/:id`);
  console.log(`  DELETE http://localhost:${PORT}/api/students/:id`);
  console.log(`\n🔍 Custom Routes:`);
  console.log(`  GET    http://localhost:${PORT}/api/students/search?q=Randy`);
  console.log(`  GET    http://localhost:${PORT}/api/students/gender/male`);
  console.log(`  GET    http://localhost:${PORT}/api/students/city/Dayton`);
  console.log(`  GET    http://localhost:${PORT}/api/stats`);
  console.log(`\n💡 Pagination: ?_page=1&_limit=10`);
  console.log(`💡 Sort: ?_sort=firstName&_order=asc`);
});
