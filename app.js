// EcoFilm Sort: Lights, Camera, Recycle! - Game Logic

class EcoFilmGame {
    constructor() {
        this.gameData = {
            wasteItems: [
                {"name": "Plastic Water Bottle", "category": "recycle", "image": "🍼", "fact": "Recycling one plastic bottle saves enough energy to power a 60-watt light bulb for 3 hours"},
                {"name": "Banana Peel", "category": "compost", "image": "🍌", "fact": "Banana peels decompose in 3-5 weeks and add potassium to soil"},
                {"name": "Pizza Box (Greasy)", "category": "trash", "image": "📦", "fact": "Greasy pizza boxes contaminate recycling - only clean cardboard can be recycled"},
                {"name": "AA Battery", "category": "hazardous", "image": "🔋", "fact": "One battery can contaminate 1 million liters of water if not disposed properly"},
                {"name": "Aluminum Can", "category": "recycle", "image": "🥤", "fact": "Aluminum cans can be recycled infinitely without losing quality"},
                {"name": "Apple Core", "category": "compost", "image": "🍎", "fact": "Apple cores decompose in 2 months and provide nutrients for plants"},
                {"name": "Styrofoam Container", "category": "trash", "image": "📋", "fact": "Styrofoam takes 500+ years to decompose and isn't recyclable in most areas"},
                {"name": "LED Light Bulb", "category": "hazardous", "image": "💡", "fact": "LED bulbs contain electronic components that need special disposal"},
                {"name": "Glass Jar", "category": "recycle", "image": "🏺", "fact": "Glass can be recycled endlessly without quality loss"},
                {"name": "Coffee Grounds", "category": "compost", "image": "☕", "fact": "Coffee grounds are nitrogen-rich and great for composting"},
                {"name": "Plastic Bag", "category": "trash", "image": "🛍️", "fact": "Most plastic bags can't go in curbside recycling but can be returned to stores"},
                {"name": "Old Smartphone", "category": "hazardous", "image": "📱", "fact": "Phones contain precious metals that can be recovered through e-waste recycling"},
                {"name": "Newspaper", "category": "recycle", "image": "📰", "fact": "Newspapers are made from recycled paper and can be recycled 5-7 times"},
                {"name": "Egg Shells", "category": "compost", "image": "🥚", "fact": "Crushed eggshells add calcium to compost and help plants grow"},
                {"name": "Broken Mirror", "category": "hazardous", "image": "🪞", "fact": "Broken glass needs special handling and can't go in regular recycling"},
                {"name": "Cardboard Box", "category": "recycle", "image": "📦", "fact": "Cardboard can be recycled 5-10 times before fibers become too short"},
                {"name": "Orange Peel", "category": "compost", "image": "🍊", "fact": "Citrus peels take longer to compost but add great nutrients to soil"},
                {"name": "Disposable Diaper", "category": "trash", "image": "👶", "fact": "Diapers take 250-500 years to decompose due to plastic components"},
                {"name": "Wine Bottle", "category": "recycle", "image": "🍷", "fact": "Glass bottles can be turned into new bottles in just 30 days"},
                {"name": "Tea Bag", "category": "compost", "image": "🫖", "fact": "Remove staples from tea bags before composting - tea leaves are great for soil"}
            ],
            characters: [
                {"name": "Eco-E", "role": "Recycling Expert", "specialty": "plastic and metal recycling", "catchphrase": "Reduce, reuse, recycle - that's how we roll!", "avatar": "🤖", "tips": ["Always rinse containers before recycling", "Check your local recycling guidelines", "When in doubt, don't contaminate the bin"]},
                {"name": "Tree Guardian", "role": "Compost Specialist", "specialty": "organic waste management", "catchphrase": "From scraps to soil - nature's perfect cycle!", "avatar": "🌳", "tips": ["Green materials need brown materials for good compost", "No meat or dairy in home compost bins", "Chop large items for faster decomposition"]},
                {"name": "Ocean Hero", "role": "Pollution Prevention", "specialty": "preventing ocean waste", "catchphrase": "Every piece of trash matters to our oceans!", "avatar": "🐠", "tips": ["Plastic takes 450+ years to decompose in oceans", "8 million tons of plastic enter oceans yearly", "Choose reusable items when possible"]},
                {"name": "Nature Protector", "role": "Environmental Educator", "specialty": "general environmental awareness", "catchphrase": "Small actions create big changes!", "avatar": "🍃", "tips": ["Hazardous waste needs special disposal sites", "Composting reduces methane emissions", "Recycling saves energy and natural resources"]}
            ],
            achievements: [
                {"name": "Recycling Director", "requirement": "Sort 15 recyclable items correctly", "icon": "🎬", "points": 100},
                {"name": "Composting Star", "requirement": "Perfect score on all compostable items", "icon": "⭐", "points": 150},
                {"name": "Eco Screenwriter", "requirement": "Complete game with 90%+ accuracy", "icon": "✍️", "points": 200},
                {"name": "Environmental Producer", "requirement": "Play 5 complete games", "icon": "🎭", "points": 250},
                {"name": "Sustainability Oscar", "requirement": "Achieve perfect score", "icon": "🏆", "points": 500}
            ]
        };
        
        this.gameState = {
            currentScreen: 'welcome',
            score: 0,
            lives: 3,
            currentItemIndex: 0,
            correctSorts: 0,
            incorrectSorts: 0,
            currentCharacter: 0,
            gameItems: [],
            earnedAchievements: [],
            gamesPlayed: parseInt(localStorage.getItem('ecofilm-games-played') || '0')
        };
        
        this.filmMessages = {
            correct: [
                "That's a wrap! Perfect sorting!",
                "Oscar-worthy performance!",
                "Cut! That was spectacular!",
                "Action! You nailed it!",
                "Bravo! Standing ovation!",
                "Box office hit sorting!"
            ],
            incorrect: [
                "Cut! Let's try that scene again",
                "Oops! Wrong bin, but great effort!",
                "Plot twist! That goes elsewhere",
                "Retake needed - but you're learning!",
                "Not quite the right script this time",
                "Director's note: Try a different bin!"
            ]
        };
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.shuffleGameItems();
        this.showScreen('welcome');
    }
    
    setupEventListeners() {
        // Navigation buttons
        document.getElementById('start-game-btn').addEventListener('click', () => {
            this.showScreen('instructions');
        });
        
        document.getElementById('start-gameplay-btn').addEventListener('click', () => {
            this.startGame();
        });
        
        document.getElementById('continue-btn').addEventListener('click', () => {
            this.hideModal();
            this.nextItem();
        });
        
        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.resetGame();
        });
        
        document.getElementById('share-score-btn').addEventListener('click', () => {
            this.shareScore();
        });
        
        // Setup drag and drop after DOM is ready
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 100);
    }
    
    setupDragAndDrop() {
        const wasteItem = document.getElementById('waste-item');
        const bins = document.querySelectorAll('.bin');
        
        if (!wasteItem || bins.length === 0) {
            console.log('Elements not found, retrying...');
            setTimeout(() => this.setupDragAndDrop(), 100);
            return;
        }
        
        // Drag events for the waste item
        wasteItem.addEventListener('dragstart', (e) => {
            console.log('Drag start');
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/html', wasteItem.outerHTML);
            wasteItem.classList.add('dragging');
        });
        
        wasteItem.addEventListener('dragend', (e) => {
            console.log('Drag end');
            wasteItem.classList.remove('dragging');
        });
        
        // Drop events for bins
        bins.forEach(bin => {
            bin.addEventListener('dragover', (e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                bin.classList.add('drag-over');
            });
            
            bin.addEventListener('dragenter', (e) => {
                e.preventDefault();
                bin.classList.add('drag-over');
            });
            
            bin.addEventListener('dragleave', (e) => {
                // Only remove if we're actually leaving the bin area
                if (!bin.contains(e.relatedTarget)) {
                    bin.classList.remove('drag-over');
                }
            });
            
            bin.addEventListener('drop', (e) => {
                e.preventDefault();
                console.log('Item dropped on bin:', bin.getAttribute('data-category'));
                bin.classList.remove('drag-over');
                const binCategory = bin.getAttribute('data-category');
                this.handleItemSort(binCategory);
            });
        });
        
        // Add click-to-sort fallback for better accessibility
        this.setupClickToSort();
    }
    
    setupClickToSort() {
        const wasteItem = document.getElementById('waste-item');
        const bins = document.querySelectorAll('.bin');
        let itemSelected = false;
        
        // Click on waste item to select
        wasteItem.addEventListener('click', () => {
            itemSelected = !itemSelected;
            if (itemSelected) {
                wasteItem.style.transform = 'scale(1.05)';
                wasteItem.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.5)';
                // Show instruction
                const characterMessage = document.getElementById('character-message');
                characterMessage.textContent = 'Great! Now click on the bin where this item belongs.';
            } else {
                wasteItem.style.transform = '';
                wasteItem.style.boxShadow = '';
            }
        });
        
        // Click on bins when item is selected
        bins.forEach(bin => {
            bin.addEventListener('click', () => {
                if (itemSelected) {
                    console.log('Bin clicked:', bin.getAttribute('data-category'));
                    const binCategory = bin.getAttribute('data-category');
                    itemSelected = false;
                    wasteItem.style.transform = '';
                    wasteItem.style.boxShadow = '';
                    this.handleItemSort(binCategory);
                }
            });
        });
    }
    
    shuffleGameItems() {
        this.gameState.gameItems = [...this.gameData.wasteItems]
            .sort(() => Math.random() - 0.5)
            .slice(0, 20);
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
            screen.classList.add('hidden');
        });
        
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            this.gameState.currentScreen = screenName;
        }
    }
    
    startGame() {
        this.gameState.score = 0;
        this.gameState.lives = 3;
        this.gameState.currentItemIndex = 0;
        this.gameState.correctSorts = 0;
        this.gameState.incorrectSorts = 0;
        this.gameState.currentCharacter = 0;
        
        this.showScreen('game');
        this.updateUI();
        this.displayCurrentItem();
        this.rotateCharacter();
        
        // Re-setup drag and drop for the game screen
        setTimeout(() => {
            this.setupDragAndDrop();
        }, 100);
    }
    
    displayCurrentItem() {
        if (this.gameState.currentItemIndex >= this.gameState.gameItems.length) {
            this.endGame();
            return;
        }
        
        const currentItem = this.gameState.gameItems[this.gameState.currentItemIndex];
        const wasteItemElement = document.getElementById('waste-item');
        
        if (wasteItemElement) {
            const emojiEl = wasteItemElement.querySelector('.item-emoji');
            const nameEl = wasteItemElement.querySelector('.item-name');
            
            if (emojiEl && nameEl) {
                emojiEl.textContent = currentItem.image;
                nameEl.textContent = currentItem.name;
            }
            
            // Reset any styles
            wasteItemElement.style.transform = '';
            wasteItemElement.style.opacity = '';
            wasteItemElement.style.boxShadow = '';
        }
    }
    
    rotateCharacter() {
        const character = this.gameData.characters[this.gameState.currentCharacter];
        const characterAvatar = document.querySelector('.character-avatar');
        const characterMessage = document.getElementById('character-message');
        const characterName = document.querySelector('.character-name');
        
        if (characterAvatar && characterMessage && characterName) {
            characterAvatar.textContent = character.avatar;
            characterName.textContent = character.name;
            
            // Get character-specific message
            const messages = this.getCharacterMessages(character);
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            characterMessage.textContent = randomMessage;
        }
        
        // Rotate character every 5 items
        if (this.gameState.currentItemIndex > 0 && this.gameState.currentItemIndex % 5 === 0) {
            this.gameState.currentCharacter = (this.gameState.currentCharacter + 1) % this.gameData.characters.length;
        }
    }
    
    getCharacterMessages(character) {
        const currentItem = this.gameState.gameItems[this.gameState.currentItemIndex];
        const baseMessages = [
            character.catchphrase,
            `Let's sort this ${currentItem.name} correctly!`,
            "Where do you think this item belongs?",
            "Take your time and think about the environment!",
            "You can drag the item or click it then click a bin!"
        ];
        
        return baseMessages.concat(character.tips);
    }
    
    handleItemSort(selectedCategory) {
        console.log('Handling item sort:', selectedCategory);
        const currentItem = this.gameState.gameItems[this.gameState.currentItemIndex];
        const isCorrect = selectedCategory === currentItem.category;
        
        if (isCorrect) {
            this.gameState.correctSorts++;
            this.gameState.score += 50;
            // Add streak bonus
            if (this.gameState.correctSorts > 0 && this.gameState.incorrectSorts === 0) {
                this.gameState.score += 10; // Streak bonus
            }
        } else {
            this.gameState.incorrectSorts++;
            this.gameState.lives--;
        }
        
        this.showFeedback(isCorrect, currentItem);
        this.updateUI();
        
        // Check if game should end due to no lives
        if (this.gameState.lives <= 0) {
            setTimeout(() => {
                this.hideModal();
                this.endGame();
            }, 3000);
        }
    }
    
    showFeedback(isCorrect, item) {
        const modal = document.getElementById('feedback-modal');
        const icon = document.getElementById('feedback-icon');
        const title = document.getElementById('feedback-title');
        const message = document.getElementById('feedback-message');
        const fact = document.getElementById('feedback-fact');
        
        if (!modal || !icon || !title || !message || !fact) {
            console.error('Feedback modal elements not found');
            return;
        }
        
        const messages = isCorrect ? this.filmMessages.correct : this.filmMessages.incorrect;
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        icon.textContent = isCorrect ? '🎬' : '🎭';
        title.textContent = randomMessage;
        
        if (isCorrect) {
            message.textContent = `Great job! You correctly sorted the ${item.name}.`;
            if (this.gameState.correctSorts > 1 && this.gameState.incorrectSorts === 0) {
                message.textContent += ` Streak bonus: +10 points!`;
            }
        } else {
            const correctBinName = item.category.charAt(0).toUpperCase() + item.category.slice(1);
            message.textContent = `The ${item.name} should go in the ${correctBinName} bin.`;
        }
        
        fact.textContent = `Did you know? ${item.fact}`;
        
        modal.classList.remove('hidden');
    }
    
    hideModal() {
        const modal = document.getElementById('feedback-modal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    nextItem() {
        this.gameState.currentItemIndex++;
        
        if (this.gameState.currentItemIndex >= this.gameState.gameItems.length) {
            this.endGame();
        } else {
            this.displayCurrentItem();
            this.rotateCharacter();
            this.updateUI();
        }
    }
    
    updateUI() {
        const scoreEl = document.getElementById('score');
        const progressEl = document.getElementById('progress');
        const livesEl = document.getElementById('lives');
        
        if (scoreEl) scoreEl.textContent = this.gameState.score;
        if (progressEl) {
            progressEl.textContent = `${this.gameState.currentItemIndex}/${this.gameState.gameItems.length}`;
        }
        if (livesEl) {
            livesEl.textContent = '❤️'.repeat(this.gameState.lives) + 
                                 '💔'.repeat(Math.max(0, 3 - this.gameState.lives));
        }
    }
    
    endGame() {
        this.gameState.gamesPlayed++;
        try {
            localStorage.setItem('ecofilm-games-played', this.gameState.gamesPlayed.toString());
        } catch (e) {
            console.log('Could not save to localStorage');
        }
        
        this.checkAchievements();
        this.showResults();
    }
    
    checkAchievements() {
        const totalItems = this.gameState.gameItems.length;
        const accuracy = totalItems > 0 ? (this.gameState.correctSorts / totalItems) * 100 : 0;
        
        this.gameState.earnedAchievements = [];
        
        // Recycling Director - Sort 15 recyclable items correctly
        const recyclableCorrect = this.gameState.gameItems
            .slice(0, this.gameState.currentItemIndex)
            .filter((item, index) => item.category === 'recycle' && index < this.gameState.correctSorts + this.gameState.incorrectSorts)
            .length;
        
        if (recyclableCorrect >= Math.min(15, this.gameState.correctSorts)) {
            this.gameState.earnedAchievements.push(this.gameData.achievements[0]);
        }
        
        // Eco Screenwriter - Complete game with 90%+ accuracy
        if (accuracy >= 90) {
            this.gameState.earnedAchievements.push(this.gameData.achievements[2]);
        }
        
        // Environmental Producer - Play 5 complete games
        if (this.gameState.gamesPlayed >= 5) {
            this.gameState.earnedAchievements.push(this.gameData.achievements[3]);
        }
        
        // Sustainability Oscar - Achieve perfect score
        if (accuracy === 100 && totalItems === this.gameState.correctSorts) {
            this.gameState.earnedAchievements.push(this.gameData.achievements[4]);
        }
        
        // Add achievement points to score
        const achievementPoints = this.gameState.earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
        this.gameState.score += achievementPoints;
    }
    
    showResults() {
        this.showScreen('results');
        
        const totalItems = this.gameState.gameItems.length;
        const accuracy = totalItems > 0 ? Math.round((this.gameState.correctSorts / totalItems) * 100) : 0;
        
        const finalScoreEl = document.getElementById('final-score');
        const correctSortsEl = document.getElementById('correct-sorts');
        const incorrectSortsEl = document.getElementById('incorrect-sorts');
        const accuracyEl = document.getElementById('accuracy');
        
        if (finalScoreEl) finalScoreEl.textContent = this.gameState.score;
        if (correctSortsEl) correctSortsEl.textContent = this.gameState.correctSorts;
        if (incorrectSortsEl) incorrectSortsEl.textContent = this.gameState.incorrectSorts;
        if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
        
        // Display achievements
        const achievementsList = document.getElementById('earned-achievements');
        if (achievementsList) {
            achievementsList.innerHTML = '';
            
            if (this.gameState.earnedAchievements.length === 0) {
                achievementsList.innerHTML = '<p style="text-align: center; color: var(--color-text-secondary);">No achievements earned this round. Play again to earn badges!</p>';
            } else {
                this.gameState.earnedAchievements.forEach(achievement => {
                    const achievementElement = document.createElement('div');
                    achievementElement.className = 'achievement';
                    achievementElement.innerHTML = `
                        <span class="achievement-icon">${achievement.icon}</span>
                        <span class="achievement-name">${achievement.name}</span>
                    `;
                    achievementsList.appendChild(achievementElement);
                });
            }
        }
        
        // Environmental impact message
        const impactMessage = document.getElementById('impact-message');
        if (impactMessage) {
            const impactMessages = [
                `You correctly sorted ${this.gameState.correctSorts} items! This knowledge helps prevent contamination and protects our ecosystems.`,
                `Great sorting skills! Your ${accuracy}% accuracy shows you understand how to reduce environmental impact.`,
                `Fantastic job! By sorting ${this.gameState.correctSorts} items correctly, you're helping create a more sustainable future.`
            ];
            
            impactMessage.textContent = impactMessages[Math.floor(Math.random() * impactMessages.length)];
        }
    }
    
    resetGame() {
        this.shuffleGameItems();
        this.startGame();
    }
    
    shareScore() {
        const totalItems = this.gameState.gameItems.length;
        const accuracy = totalItems > 0 ? Math.round((this.gameState.correctSorts / totalItems) * 100) : 0;
        const shareText = `🎬 I just played EcoFilm Sort and scored ${this.gameState.score} points with ${accuracy}% accuracy! I correctly sorted ${this.gameState.correctSorts} out of ${totalItems} waste items. Join me in learning about recycling! 🌍♻️`;
        
        if (navigator.share) {
            navigator.share({
                title: 'EcoFilm Sort: Lights, Camera, Recycle!',
                text: shareText,
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback: copy to clipboard
            if (navigator.clipboard) {
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('Score copied to clipboard! Share it with your friends!');
                }).catch(() => {
                    alert(`Share your score: ${shareText}`);
                });
            } else {
                alert(`Share your score: ${shareText}`);
            }
        }
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    new EcoFilmGame();
});