export default class Dictionnaire {
  public constructor() {}

  public static async getMot(idPartie: string, datePartie: Date): Promise<string> {
    return await this.getNomFichier(idPartie, datePartie)
      .then((nom) => fetch("http://localhost:3000/mot.txt"))
      .then(
        (resultat) =>
          new Promise<string>((resolve, reject) => {
            console.log(resultat)

            return resolve(resultat.text());
          })
      )
      .then(async (motBrut) => {
        console.log(motBrut)
        let mot = Dictionnaire.nettoyerMot(motBrut);
        let longueur = mot.length;
        let premiereLettre = mot[0];
        
        return mot;
      });
  }

  private static async getNomFichier(idPartie: string, datePartie: Date): Promise<string> {
    let datePartieStr =
      datePartie.getFullYear().toString() +
      "-" +
      (datePartie.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      datePartie.getDate().toString().padStart(2, "0");

    return btoa(idPartie + "-" + datePartieStr);
  }

  public static async estMotValide(mot: string, premiereLettre: string, longueur: number): Promise<boolean> {
    mot = this.nettoyerMot(mot);
    const request = await fetch("http://localhost:3000/isvalid/" + mot);
    const payload = await request.json();
    return payload.result && mot.startsWith(premiereLettre) && (mot.length >= 6 && mot.length <= 9);
  }

  public static nettoyerMot(mot: string): string {
    return mot
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }
}
