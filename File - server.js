const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve all Goal Zone website files
app.use(express.static(path.join(__dirname)));

// Football API settings
const FOOTBALL_API_URL = "https://api.football-data.org/v4";

// Helper function for football-data.org
async function footballRequest(endpoint) {
    const response = await fetch(
        `${FOOTBALL_API_URL}${endpoint}`,
        {
            headers: {
                "X-Auth-Token": process.env.FOOTBALL_API_KEY
            }
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
            `Football API error ${response.status}: ${errorText}`
        );
    }

    return response.json();
}


// ===============================
// LIVE MATCHES
// ===============================
app.get("/api/live", async (req, res) => {
    try {
        const data = await footballRequest("/matches");

        const liveMatches = data.matches.filter(match =>
            [
                "LIVE",
                "IN_PLAY",
                "PAUSED"
            ].includes(match.status)
        );

        res.json(liveMatches);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to load live matches"
        });
    }
});


// ===============================
// ALL MATCHES
// ===============================
app.get("/api/matches", async (req, res) => {
    try {
        const dateFrom = req.query.dateFrom;
        const dateTo = req.query.dateTo;

        let endpoint = "/matches";

        if (dateFrom && dateTo) {
            endpoint += `?dateFrom=${dateFrom}&dateTo=${dateTo}`;
        }

        const data = await footballRequest(endpoint);

        res.json(data.matches);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to load matches"
        });
    }
});


// ===============================
// STANDINGS
// ===============================
app.get("/api/standings", async (req, res) => {
    try {
        const competition = req.query.competition || "PL";

        const data = await footballRequest(
            `/competitions/${competition}/standings`
        );

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Unable to load standings"
        });
    }
});


// ===============================
// HEALTH CHECK
// ===============================
app.get("/api/status", (req, res) => {
    res.json({
        status: "online",
        website: "Goal Zone",
        message: "Goal Zone backend is working!"
    });
});


// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
    console.log(`Goal Zone running on port ${PORT}`);
});