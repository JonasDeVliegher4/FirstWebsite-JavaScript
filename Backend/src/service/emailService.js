require('dotenv').config();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const axios = require('axios');
const {getLogger} = require('../core/logging');
const ServiceError = require('../core/serviceError');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'garrett.schmitt2@ethereal.email',
        pass: 'kbZUPPqbjQCtnQNTvk'
    }
});

async function sendEmail(naar, onderwerp, tekst) {
    const mailOptions = {
        from: 'garrett.schmitt2@ethereal.email',
        to: naar,
        subject: onderwerp,
        text: tekst,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        getLogger().info('Email sent: ' + info.response + ' to ' + naar);
        return info;
    } catch (error) {
        getLogger().error('Failed to send email to ' + naar + ': ' + error.message);
    }
}

const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers['Authorization'] = `Bearer ${token}`; // 👈 4
    } else {
      delete axios.defaults.headers['Authorization']; // 👈 5
    }
};  

module.exports = function startCronJobs() {

    cron.schedule('48 14 * * *', async () => {

        try 
        {
            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);
            const isoTomorow = tomorrow.toISOString().split('T')[0];

            const loginResponse = await axios.post('http://localhost:9000/api/user/login', {
                email: "vervaetsofie@gmail.com", 
                password: "12345678"
            });
            const login = loginResponse.data;
            const loginToken = login.token;

            setAuthToken(loginToken);
        
            const response = await axios.get(`http://localhost:9000/api/afspraken/date/${isoTomorow}`);
            const afspraken = response.data;
        

            if (!afspraken || afspraken.length === 0) {
                getLogger().info(`Geen afspraken voor ${isoTomorow}. Er worden geen herinneringen verstuurd.`);
                return;  
            }
  
            for (const afspraak of afspraken) {
                const { date_StartTime, user_id, typeAfspraak_id} = afspraak;
  
                const klantResponse = await axios.get(`http://localhost:9000/api/user/${user_id}`);
                const klant = klantResponse.data;
                const klantNaam = klant.name;
                const klantEmail = klant.email;
                const klantPhoneNr = klant.phoneNr;      
  
                const typeAfspraakResponse = await axios.get(`http://localhost:9000/api/typeAfspraak/${typeAfspraak_id}`);
                const typeAfspraak = typeAfspraakResponse.data;
                const typeAfspraakName = typeAfspraak.name;
  
                const dateObj = new Date(date_StartTime);
                const datum = dateObj.toISOString().split('T')[0];
                const tijd = dateObj.toTimeString().split(' ')[0];
            
                const adminOnderwerp = `Reminder: Morgen is er Afspraak gepland`;
                const adminTekst = `Dag Sofie.

                Morgen is er afspraak gepland op ${datum} om ${tijd}.
                Deze Afspraak is met ${klantNaam}.
                En het is een ${typeAfspraakName} afspraak.
                Als u de afspraak wil annuleren of nog iets vragen aan de klant dit zijn de klant zijn contact gegevens:
                Email: ${klantEmail}.
                Telefoon nummer: ${klantPhoneNr}.
            
                Veel succes met de klant.`;

                const klantOnderwerp = `Reminder: Morgen heb jij een afspraak gepland`;
                const klantTekst = `Dag ${klantNaam}.
            
                Je hebt morgen en afspraak gepland bij Sofie Verveat.
                Dit is een ${typeAfspraakName} afspraak.
                Deze afspraak vind zich plaats op ${datum} om ${tijd}.
                Als u nog vragen heeft of u wilt de afspraak annuleren kan u mij conatcteren op deze gegevens:
                Email: vervaetsofie@gmail.com.
                Telefoon nummer: 32472464939.
            
                Alvast tot morgen dan,
                Vriendelijke groeten.`;
            
                await sendEmail("jonas.devliegher@student.hogent.be", adminOnderwerp, adminTekst);
                getLogger().info(`Reminder sent to admin for client: ${klantNaam}`);
  
                await sendEmail(klantEmail, klantOnderwerp, klantTekst);
                getLogger().info(`Reminder sent to client: ${klantEmail}`);
            }
  
        } catch (error) {
            getLogger().error('Error fetching afspraken or sending emails:', error);
            throw new ServiceError('Failed to process reminders', error)
        }
    });
}