"use strict";

window.addEventListener("load", playDrawPoker);

function playDrawPoker() {
   // Reference buttons and images within the Poker Game page
   let dealButton = document.getElementById("dealB");
   let drawButton = document.getElementById("drawB");
   let standButton = document.getElementById("standB");
   let resetButton = document.getElementById("resetB");
   let statusBox = document.getElementById("status");
   let betSelection = document.getElementById("bet");
   let bankBox = document.getElementById("bank");
   let cardImages = document.querySelectorAll("img.cardImg");
   pokerGame.currentBank = 500;
   pokerGame.currentBet = 25;
   let myDeck = new pokerDeck();
   myDeck.shuffle();
   let myHand = new pokerHand(5);
   bankBox.value = pokerGame.currentBank;

   betSelection.onchange = function() {
      pokerGame.currentBet = parseInt(this.value);
   }
    
   
      dealButton.addEventListener("click", function() {
      if (pokerGame.currentBank >= pokerGame.currentBet) {
         // Enable the Draw and Stand buttons after the initial deal
         dealButton.disabled = true;     
         betSelection.disabled = true;     
         drawButton.disabled = false;       
         standButton.disabled = false;     
         statusBox.textContent = "";       
         bankBox.value = pokerGame.placeBet();
      
         if (myDeck.cards.length < 10) {
         myDeck = new pokerDeck();
         myDeck.shuffle();
         }
         myDeck.dealTo(myHand);
         // Display the card images on the table
         for (let i = 0; i < cardImages.length; i++) {
            cardImages[i].src = myHand.cards[i].cardImage();
            // Flip the card images when clicked
            cardImages[i].onclick = function() {
               if (this.src.includes("cardback.png")) {
               // Show the front of the card
               this.src = myHand.cards[i].cardImage();
               } else {
               // Show the back of the card
               this.src = "cardback.png";
               }
               }
            }

         console.log(myDeck, myHand);
      } else {
         statusBox.textContent = "Insufficient Funds";
         }

   });
   
   
   drawButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to draw new cards
      dealButton.disabled = false;      
      betSelection.disabled = false;     
      drawButton.disabled = true;         
      standButton.disabled = true;        
      
      for (let i = 0; i < cardImages.length; i++) {
         if (cardImages[i].src.includes("cardback.png")) {
         myHand.replaceCard(i, myDeck);
         cardImages[i].src = myHand.cards[i].cardImage();
         }
         }

      statusBox.textContent = myHand.getHandValue();
      // Update the bank value
      bankBox.value = pokerGame.payBet(statusBox.textContent);


   });
   
    
   standButton.addEventListener("click", function() {
      // Enable the Deal and Bet options when the player chooses to stand with their hand 
      dealButton.disabled = false;       
      betSelection.disabled = false;     
      drawButton.disabled = true;         
      standButton.disabled = true;       

      // Evaluate the hand drawn by user
      statusBox.textContent = myHand.getHandValue();

      // Update the bank value
      bankBox.value = pokerGame.payBet(statusBox.textContent);

    
   });
   
   
   // Reload the current page when the Reset button is clicked
   resetButton.addEventListener("click", function() {
      location.reload();
   });
}