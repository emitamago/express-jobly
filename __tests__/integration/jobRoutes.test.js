const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const Job = require("../../models/job");
const { Company } = require("../../models/company")

describe("Test Company Class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM companies");
    let c1 = await Company.create({
      handle: "amazon",
      name: "Amazon",
      num_employees: 3000000,
      description: "Online market place and AWS",
      logo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWYikqi0wGu6e_BLcEcDtINNitmXY_8aKKUsokN3dCeZ3gCF8o"
    });

    let c2 = await Company.create({
      handle: "apple",
      name: "Apple",
      num_employees: 10000,
      description: "Hip computers and stuff",
      logo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWYikqi0wGu6e_BLcEcDtINNitmXY_8aKKUsokN3dCeZ3gCF8o"
    });

    let j1 = await Job.create({
      title: "Junior Backend Developer",
      salary: 90000,
      equity: 0.01,
      company_handle: "amazon",
    });

    let j2 = await Job.create({
      title: "Senior Backend Developer",
      salary: 190000,
      equity: 0.05,
      company_handle: "amazon",
    });

    let j3 = await Job.create({
      title: "Fullstack Developer",
      salary: 300000,
      equity: 0.07,
      company_handle: "apple",
    });

    let j4 = await Job.create({
      title: "Administrative assistant",
      salary: 70000,
      equity: 0.001,
      company_handle: "apple",
    });
  });

  describe("GET/jobs", function () {
    /** GET /jobs => {companies: [...]}  */
    test("can get list of jobs", async function () {
      let response = await request(app)
        .get("/jobs")
      console.log(response.body)
      expect(response.body).toEqual({
        jobs: [
          { title: 'Administrative assistant', company_handle: 'apple' },
          { title: 'Fullstack Developer', company_handle: 'apple' },
          { title: 'Senior Backend Developer', company_handle: 'amazon' },
          { title: 'Junior Backend Developer', company_handle: 'amazon' }
        ]
      });
    });
  });

});


afterAll(async function () {
  await db.end();
})
