# Jonas De Vliegher (292116jd)

- [X] Front-end Web Development
  - https://github.com/Web-IV/2324-frontendweb-JonasDeVliegher4.git
  - https://frontendweb-jonasdevliegher.onrender.com
- [X] Web Services: GITHUB URL
  - https://github.com/Web-IV/2324-webservices-JonasDeVliegher4.git
  - https://webservices-jonasdevliegher.onrender.com

**Logingegevens**

- Admin login (default login)
- Gebruikersnaam/e-mailadres: vervaetsofie@gmail.com
- Wachtwoord:12345678

- User 1 login 
- Gebruikersnaam/e-mailadres: devliegherjonas@gmail.com
- Wachtwoord:12345678

- User 2 login 
- Gebruikersnaam/e-mailadres: krisdevliegher@gmail.com
- Wachtwoord:12345678



## Projectbeschrijving

Dit project is een website gmeaakt voor het bijberoep van mijn moeder een voet en hand vrzorging. deze website bevat een agenda om alle gemaakte afpraken na te kijken van de eigenaar maar ook voor elke klant. Dus een klant heeft zijn gepersonaliseerde agenda. Een klant kan ook zien welke soort afspraken mijn moeder aan bied. Hiervoor moeten ze niet ingelogd zijn. De klant kan ook op deze website een afspraak maken. De website houd rekening met al gemaakt afspraken zodat er geen overlap is.

![ERD](image-6.png)

## Screenshots

- Dit is de hoofdpagina de agenda(hiervoor moet je ingelogd zijn)

![Dark-agenda](image-2.png)

![Light-agenda](image-3.png)

- Dit is de agenda met afspraken er in.

![Dark-agenda-afspraken](image-4.png)

![Light-agenda-afspraken](image-5.png)

- Hier kan je afspraken maken

![Dark-afspraken-maken](image-8.png)

![Light-afspraken-maken](image-7.png)

- Hier zie je de pagina van alle soorten afspraken

![Dark-soorten-afspraken](image-9.png)

![Light-soorten-afspraken](image-10.png)


## API calls

### Users

- `GET /api/user`: Alle gebruikers ophalen (admin)
- `GET /api/user/:id`: Gebruiker met een bepaald id ophalen
- `POST /api/user/login`: login van een gebruiker
- `POST /api/user/register`: Registeren van een nieuwe gebruiker
- `PUT /api/user/:id`: Verandert gebruiker met een bepaald id
- `DELETE /api/user/:id`: Verwijderd de gebruiker een bepaald id

### Afspraken

- `GET /api/afspraken`: Alle afspraken ophalen van de gebruiker 
- `GET /api/afspraken/admin`: Alle afspraken ophalen in het systeem
- `GET /api/afspraken/:id`: Afspraak met een bepaald id ophalen
- `GET api/afspraken/date/:date`: Afspraken op een date ophalen
- `POST /api/afspraken`: Een Afspraak maken 
- `PUT /api/afspraken/:id`: Verandert een afspraak met een bepaalde id
- `DELETE /api/afspraken:id` Verwijderd een afspraak met een bepaalde id

### TypeAfpraak

- `GET /api/typeAfspraak`: Alle typeAfspraken ophalen
- `GET /api/typeAfspraak/:id`: typeAfspraak met een bepaald id ophalen

### Category 

- `GET /api/category`: Alle Categorien ophalen
- `GET /api/category/:id`: Category met een bepaalde id ophalen

## Behaalde minimumvereisten

### Front-end Web Development

- **componenten**

  - [X] heeft meerdere componenten - dom & slim (naast login/register)
  - [X] applicatie is voldoende complex
  - [X] definieert constanten (variabelen, functies en componenten) buiten de component
  - [X] minstens één form met meerdere velden met validatie (naast login/register)
  - [X] login systeem
<br />

- **routing**

  - [X] heeft minstens 2 pagina's (naast login/register)
  - [X] routes worden afgeschermd met authenticatie en autorisatie
<br />

- **state-management**

  - [X] meerdere API calls (naast login/register)
  - [X] degelijke foutmeldingen indien API-call faalt
  - [X] gebruikt useState enkel voor lokale state
  - [X] gebruikt gepast state management voor globale state - indien van toepassing
<br />

- **hooks**

  - [X] gebruikt de hooks op de juiste manier
<br />

- **varia**

  - [X] een aantal niet-triviale e2e testen
  - [X] minstens één extra technologie
  - [X] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [X] duidelijke en volledige README.md
  - [X] volledig en tijdig ingediend dossier en voldoende commits

### Web Services

- **datalaag**

  - [X] voldoende complex (meer dan één tabel, 2 een-op-veel of veel-op-veel relaties)
  - [X] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [X] heeft migraties - indien van toepassing
  - [X] heeft seeds
<br />

- **repositorylaag**

  - [X] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [X] mapt OO-rijke data naar relationele tabellen en vice versa - indien van toepassing
<br />

- **servicelaag met een zekere complexiteit**

  - [X] bevat alle domeinlogica
  - [X] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [X] meerdere routes met invoervalidatie
  - [X] degelijke foutboodschappen
  - [X] volgt de conventies van een RESTful API
  - [X] bevat geen domeinlogica
  - [X] geen API calls voor entiteiten die geen zin hebben zonder hun ouder (bvb tussentabellen)
  - [X] degelijke authorisatie/authenticatie op alle routes
<br />

- **algemeen**

  - [X] er is een minimum aan logging voorzien
  - [X] een aantal niet-triviale integratietesten (min. 1 controller >=80% coverage)
  - [X] minstens één extra technologie
  - [X] maakt gebruik van de laatste ES-features (async/await, object destructuring, spread operator...)
  - [X] duidelijke en volledige README.md
  - [X] volledig en tijdig ingediend dossier en voldoende commits

## Projectstructuur

### Front-end Web Development

- ik heb ene src volder met al mijn componenten.
- daar zit in mijn api folder, deze folder zitten de api calls die ik gebruik.
- dan heb ik een map components. met alle componets die ik gebruik van error handeling loader en uitvoers van mijn afspraken en typeAfspraken
- dan heb ik een map contexts daar zit alles voor mijn theme in en da authprovider voor de login en registeer functie
- dan folder met de paginas. van mijn website mijn list van mijn afspraken en typeafspraken en een pagina voor het toevoegen van afspraken en de pagina's voor login, logout en register
- En uit de scr volder is de main 


### Web Services

- ik heb een config folder die configratie van mijn database en test bevat
- en in de src volder heb ik nog verschilende mappen zoals de core map met configratie van de auth, jwt, logging, password, roles, error, validation en middelware
- en de data map de mijn data initialize en bevat de migrations en seeds van de database.
- dan verder in src is mijn repository, rest en service van mijn afspraken, users en typeAfspraken
- dan verder in de src map maakt het mijn server aan en is mijn main
- In de service mappen heb ik ook mijn mail service

## Extra technologie

### Front-end Web Development

- In de front en maak ik gebruik van een framework om mijn agenda te maken. Ik gebruik het ChakraProvider dit is in de AfsprakenFrom bestand. Deze agenda kan je naar de volgende week gaan waar alle afspraken op de juist datum staan. En het geeft ook aan welke dag we zijn in het rood. En het heeft een dark en light mode. hier onder staat nog zo'n voorbeeld van die agenda. 

![Dark-agenda-afspraken](image-4.png)

### Web Services

- In mijn webservice hab ik een email server die elke dag op 10 uur (ochtend) kijkt of er een afspraak is morgen en als er een is dan stuurd die een mail naar de admin eigenaar om te zeggen dat je er een afspraak morgen gepklant is. En een email naar de klant van die afspraak om te melden dat er een afspraak gepland staat morgen. hieronder staan de foto's van de mail. µ

![user-email](image.png)

![admin-email](image-1.png)

![email-dropbox](image-11.png)


## Testresultaten

### Front-end Web Development

- Ik heb testen geschreven hoe ik moet inloggen en uitloggen.

![login-logout](image-15.png)

- En ik heb een test geschreven hoe je een afspraak aanmaakt. 
Deze test doet wel vreemt hij maakt te test aan maar als hij de kijken of de afspraak er staat zegt cypress dat de afspraak er niet is ok al staat die er wel 
Als je rechts op de foto ziet.

![afspraak-maken](image-16.png)


- ik heb een test geschreven hoe ik een afspraak kan zien.
![afspraken-zien](image-14.png)

- En ik heb een test geschreven hoe alle soorten afspraken see.
![typeAfspraken-zien](image-13.png)

- En een registeer test
![register](image-12.png)

### Web Services

- Ik heb voor da afspraken testen geschreven. voor alle API calls heb ik een test geschreven.
 
- Ik heb voor de test geschreven voor de user. alle API calls en ook voor de login en register.

- En ook wat typeAfspraak ook voor mijn 2 api calls ook testen geschreven.

- En ook voor mijn categorien heb de testeb geschreven voor mijn 2 api calss

![testen-web](image-17.png)

## Gekende bugs

### Front-end Web Development

- geen gekende bugs

### Web Services

- hij verstuurt de emails via the ethereal email zoals je ziet maar ik krijg ze niet binnen op de emails waar ze moeten toe komen.
 Ik heb geprobeerd gmail te gebruiken in plaats van ethereal maar dan zegt hij dat de inlog gegevens fout zijn ook al kloppen ze.

## Wat is er verbeterd/aangepast?

### Front-end Web Development

- Ik wil een homepagina in plaats van direct naar de agenda waar je moet inloggeb

### Web Services

- eens kijken wat het probeleem is bij de email
