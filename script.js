let numDice = 0;
let negative = false;
let roll = false;
new Dialog({
  title: 'Roll a Check',
  content: `
  <form>
    <div class="form-group">
      <label>Number of dice:
        <input type="numeric" name="dice" placeholder="e.g. 3"></input>
      </label>
    </div>
  </form>
  `,
  buttons: {
    normal: {
      icon: "<i class='fas fa-dice-d20'></i>",
      label: 'Regular roll',
      callback: (html) => {
        let formVal = html.find('input[name="dice"]');
        if (formVal && formVal.val() !== 0) {
          numDice = formVal.val();
        }
        roll = true;
      }
    },
    negative: {
      icon: "<i class='fas fa-dice-d20'></i>",
      label: 'Negative dice',
      callback: (html) => {
        numDice = 1;
        negative = true;
        roll = true;
      }
    }
  },
  default: 'normal',
  close: html => {
    if (!roll)
      return;
    let r = new Roll(!negative ? `${numDice}d10x10cs>7` : '1d10cs>9').roll();
    let successes = r.total;
    let chatData = {
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: `Rolled ${numDice}d10 and got ${successes} ${successes > 1 ? 'successes' : 'success'}`
    };
    r.toMessage({speaker: ChatMessage.getSpeaker()})
    ChatMessage.create(chatData, {});
  }
}).render(true);
