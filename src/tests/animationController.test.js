import request from "supertest";
import app from "../../index";
import { sequelize } from "../config/dbclient";

describe("Animation Controller", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(5173); // Lancer le serveur avant les tests
    await sequelize.authenticate(); // Vérifier la connexion à la BDD
  });

  afterAll(async () => {
    await sequelize.close(); // Fermer la connexion à la BDD
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('"Server.closed"');
          resolve();
        }
      });
    }); // Attendre la fermeture du serveur
  });

  it("return 200 and all animations", async () => {
    const response = await request(app).get("/api/animations");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
