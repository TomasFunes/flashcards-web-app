const HELP_P = "my-4";

export function Help() {
    return(
        <div role="help" className="section">
            <h2 className="font-bold text-2xl my-2">How to Use?</h2>
            <p className={HELP_P}>Welcome to our flashcard application. To help you memorize more effectively, we use the Leitner System, a proven method that organizes your cards into five different groups. Here’s how it works:</p>
            
            <h3 className="font-bold text-lg my-2">1. What is the Leitner System?</h3>
            <p className={HELP_P}>The Leitner System is a spaced repetition technique that optimizes learning by focusing on the cards you need to practice the most. This method divides your cards into groups, or "boxes," based on how well you remember the information.</p>
            
            <h3 className="font-bold text-lg my-2">2. How Cards are Organized</h3>
            <ul>
                <li className={HELP_P}><strong>Group 1 (Box 1)</strong>: Contains cards you have just started studying.</li>
                <li className={HELP_P}><strong>Group 2 (Box 2)</strong>: Cards that you have answered correctly several times. These are reviewed less frequently than those in Group 1.</li>
                <li className={HELP_P}><strong>Group 3 (Box 3)</strong>: Cards that you have mastered quite well. Reviews are even less frequent.</li>
                <li className={HELP_P}><strong>Group 4 (Box 4)</strong>: Cards that you have confidently remembered several times. Review is sporadic.</li>
                <li className={HELP_P}><strong>Group 5 (Box 5)</strong>: Cards that you have completely mastered. These are reviewed very rarely.</li>
            </ul>
            
            <h3 className="font-bold text-lg my-2">3. How to Use the Application</h3>
            <ol>
                <li className={HELP_P}><strong>Answer the Cards</strong>: As you answer, categorize each card based on your response. If you answer correctly, the card will advance to the next group. If you get it wrong, it will return to Group 1 for more repetitions.</li>
                <li className={HELP_P}><strong>Keep Practicing</strong>: Dedicate regular time to review each group. As you progress, the cards in the higher groups will require less study time, allowing you to focus on improving in areas that still pose challenges.</li>
            </ol>
        </div>

    )
}