import request from "supertest";
import app from "../../index"; // Assurez-vous que le chemin est correct
import { sequelize } from "../config/dbclient"; // Importez sequelize correctement

describe("Animation Controller", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(5173); // Lancer le serveur avant les tests
    await sequelize.authenticate(); // Vérifier la connexion à la base de données
  });

  afterAll(async () => {
    await sequelize.close(); // Fermer la connexion à la base de données
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

  it("should return status 200 and an array of animations", async () => {
    const response = await request(app).get("/api/animations");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });
});
