test("get to /api/v1/status should return validated json", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  // validate updated_at prop
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  // validate postgres_version prop
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.opened_connections).toEqual(1);
});

test.skip("SQL Injection Test", async () => {
  await fetch("http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4);--");
});
