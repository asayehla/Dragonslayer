new Vue({
  el: '#app',
  data: {
    playerhealth: 100,
    monsterhealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerhealth = 100;
      this.monsterhealth = 100;
      this.turns = [];

    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.monsterhealth -= damage;
      this.turns.unshift({
        isPlayer:true,
        text:'Player hits dragon for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterattacks();
    },

    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterhealth -= damage;
      this.turns.unshift({
        isPlayer:true,
        text:'Player hits dragon with special attack for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterattacks();
    },
    heal: function() {
      if (this.playerhealth <= 90) {
      this.playerhealth += 10;
    } else {
      this.playerhealth = 100;
    }
    this.turns.unshift({
      isPlayer:true,
      text:'Player heals for 10'
    });
      this.monsterattacks();
    },
    flee: function() {
      this.gameIsRunning = false;

    },
    monsterattacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerhealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer:false,
        text:'Dragon hits player for ' + damage
            });
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterhealth <= 0) {
        if (confirm('You won! Start again?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return;
      } else if (this.playerhealth <= 0) {
        if (confirm('You lost! Start again?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
