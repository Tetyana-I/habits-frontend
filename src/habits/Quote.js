import { useState, useEffect } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import "./Quote.css"

import axios from "axios";

function Quote() {
    const [infoLoaded, setInfoLoaded] = useState(false);
    const [quote, setQuote] = useState({});

useEffect(function loadQuote() {
    console.debug("App useEffect loadQuote");
    
    async function getQuote() {
        setInfoLoaded(true);
        try {
            let quoteRes = await axios.get("https://api.goprogram.ai/inspiration");
            setQuote(quoteRes.data);
        } catch (err) {
            console.error("App loadQuote: problem loading", err);
        }
    }
    // set infoLoaded to false while async getQuote runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to false to control the spinner.
    setInfoLoaded(false);
    getQuote();
    }, []);

    if (!infoLoaded) return <LoadingSpinner />;

    return (
        <div className="Quote col-md-8 offset-md-2">
            <h5>"{quote.quote}"</h5>
            <p><i>- {quote.author}</i></p>            
        </div>
    )
}

export default Quote;