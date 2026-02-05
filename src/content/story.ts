// ============================================================
//  STORY CONTENT — Edit this file to customize all game text
// ============================================================

// --- Character Descriptors (easy to swap) ---
export const protagonistDescriptor = 'a beautiful brunette adventurer';
export const bardDescriptor = 'a handsome blond bard';

// --- Default Names ---
export const defaultProtagonistName = 'My Love';
export const defaultBardName = 'Sir Cristof the Golden';

// --- Bard Quips (sprinkled through the game) ---
export const bardQuips = [
  '"Every step you take writes another verse in our ballad."',
  '"If courage were gold, you\'d outshine the sun itself."',
  '"I composed a song about your bravery. It\'s seven stanzas long… so far."',
  '"Between you and me, this is the finest quest I\'ve ever been part of."',
  '"My lute trembles in your presence. Or perhaps that\'s just me."',
];

// -------------------------------------------------------
//  TAVERN SCENE
// -------------------------------------------------------
export const tavernScene = {
  title: 'The Gilded Tankard Tavern',
  narrative: `The warm glow of hearth-fire paints the walls of the Gilded Tankard Tavern. {protagonistName}, ${protagonistDescriptor}, steps through the oaken door. The Festival of Hearts is mere hours away—garlands of paper roses hang from the rafters, and the air is sweet with cinnamon and hope.

At the far end of the bar, {bardName}, ${bardDescriptor}, strums a gentle melody on a well-loved lute. His golden hair catches the firelight as he spots you, and his face breaks into a dazzling smile.

"Ah, {protagonistName}! Just the hero I was hoping to see." He sets down his lute and leans forward. "The Heartstone—the enchanted gem that lights every festival lantern—has been shattered by a mischief imp, and its three shards scattered across the land."

He places his hand over his heart, voice softening. "Without it, the Festival of Hearts cannot begin. Will you retrieve the pieces before sunset? I shall be with you… in spirit, and in song."`,
};

export const tavernReturn = {
  partial: `You push through the tavern door, shards glowing safely in your pack. {bardName} looks up from his lute with an encouraging smile.

"Well done, {protagonistName}! But the Heartstone isn't whole yet—there are still shards to find." He strums a hopeful chord. "Where shall we venture next?"`,

  allCollected: `The tavern door bursts open as you return, triumphant. All three shards pulse with warmth in your pack, filling the room with a soft, rosy glow.

{bardName} leaps to his feet, eyes shining with pride and something deeper. "You found them all! {protagonistName}, you're incredible."

His voice grows serious. "But there's one final obstacle. The Mischief Imp still lurks out there, guarding a fragment of shadow. We must confront it to restore the Heartstone." He squares his shoulders, lute at the ready. "Are you prepared?"`,
};

// -------------------------------------------------------
//  LOCATION SCENES
// -------------------------------------------------------
export interface LocationContent {
  title: string;
  shardName: string;
  narrative: string;
  rollPrompt: string;
  failDialogues: string[];
  outcomes: {
    low: string;
    mid: string;
    high: string;
  };
}

export const locationScenes: Record<string, LocationContent> = {
  forest: {
    title: 'The Whispering Forest',
    shardName: 'Petal Shard',
    narrative: `The ancient trees of the Whispering Forest sway gently, their branches draped in silver moss that glows faintly in the twilight. Somewhere among the roots and ferns, a faint pink light pulses—the Petal Shard.

A voice seems to echo between the trunks: "The forest reveals its treasures only to those with a pure heart… or a lucky hand."`,
    rollPrompt: 'Search the enchanted undergrowth',
    failDialogues: [
      `You push through the tangled brambles, following the faint glow—but the forest sprites giggle and snuff it out, leading you in a circle back to where you started. The shard remains hidden… for now.`,
      `A mischievous root catches your foot and sends you tumbling into a pile of enchanted leaves. When the sparkles clear, you're no closer to the shard. The forest seems to be testing your resolve.`,
      `The whispering voices grow louder, overlapping into nonsense. You follow what you think is a trail of pink light, only to discover it was a luminous mushroom. The real shard still eludes you.`,
      `Silver foxes dart across your path, and in the confusion you lose sight of the glow entirely. The forest hasn't rejected you—but it isn't making this easy, either.`,
    ],
    outcomes: {
      low: `The forest sprites play tricks, leading you in circles through tangled brambles. You stumble over roots and nearly lose hope—but then, glinting beneath a mossy stone, you spot the shard! You emerge scratched but victorious.

{bardName}'s distant voice carries on the wind: "A lesser hero would have turned back. Not you. Never you."`,

      mid: `You follow the whispering voices through a winding trail of moonlit ferns. A family of silver foxes watches curiously as you reach into a hollow tree and retrieve the glowing Petal Shard. A respectable adventure!

Somewhere, you're certain you hear {bardName} humming approvingly.`,

      high: `The forest parts before you as if in welcome. Birds sing an impromptu fanfare as you stride directly to the shard, plucking it from a bed of moonflowers with effortless grace. Even the ancient oak spirits seem impressed.

{bardName} would later write an entire verse about this moment: "She walked where shadows feared to tread, and even starlight bowed its head."`,
    },
  },

  market: {
    title: 'The Moonlit Market',
    shardName: 'Ribbon Shard',
    narrative: `The Moonlit Market never truly closes—its enchanted stalls shimmer between reality and dream, selling everything from bottled starlight to yesterday's fortunes. Somewhere in this maze of wonders, the Ribbon Shard awaits.

A merchant with too many eyes beckons from behind a puzzle-box stall. "Solve the riddle," they whisper, "and the shard is yours. Fail… and you buy a souvenir candle."`,
    rollPrompt: 'Attempt the merchant\'s riddle',
    failDialogues: [
      `The merchant's riddle twists your mind into a pretzel. You blurt out an answer that makes even the puzzle-box cringe. "Not quite," the merchant says with a smirk. "Care to try again?"`,
      `You confidently declare the answer—but the puzzle-box rattles, flashes red, and spits out a souvenir candle. The merchant chuckles, all their eyes twinkling. "Brave attempt. Another go?"`,
      `The riddle's words rearrange themselves every time you think you've figured it out. You're fairly sure the merchant is cheating, but they just blink innocently with all seven eyes. "Take another crack at it."`,
      `Your answer hangs in the air for an awkward moment before the merchant slowly shakes their head. "Creative, I'll give you that. But the box demands precision. Try once more?"`,
    ],
    outcomes: {
      low: `The riddles twist your mind in knots. You accidentally purchase three cursed candles and a prophetic fish before stumbling upon the Ribbon Shard in a bargain bin. Not your finest hour—but you have the shard!

{bardName} would say: "Even the greatest ballads have a comic verse or two."`,

      mid: `With clever reasoning and a bit of charm, you navigate the merchant's riddles. The puzzle-box clicks open, revealing the shimmering Ribbon Shard nestled in velvet. Well played.

The merchant nods approvingly. "Come back anytime. You're good for business."`,

      high: `You solve the riddle before the merchant even finishes asking it. Their many eyes blink in astonishment as they hand over the Ribbon Shard with newfound respect.

"Remarkable," they murmur. {bardName} would be proud—he always said you were the cleverest person he'd ever met.`,
    },
  },

  ruins: {
    title: 'The Crumbled Ruins',
    shardName: 'Candle Shard',
    narrative: `Ancient stones rise against the purple sky—the ruins of a temple once dedicated to an old love deity. Rose vines have claimed the crumbling walls, and at the heart of the sanctuary, the Candle Shard glows warmly atop a cracked altar.

But the path is guarded by a series of pressure plates and riddles carved in stone. One wrong step and… well, best not to think about that.`,
    rollPrompt: 'Navigate the ancient temple traps',
    failDialogues: [
      `You step on what you thought was a safe tile—and a burst of ancient confetti explodes in your face. When the glitter clears, a stone wall has slid back into place, blocking your path. Time to find another way.`,
      `A pressure plate clicks beneath your boot and a volley of harmless but startling rose petals shoots from the walls. You stumble back to the entrance, heart pounding. The altar remains out of reach.`,
      `You carefully decode the stone riddle… and get it spectacularly wrong. The floor tiles rearrange themselves with a grinding rumble, resetting the puzzle. The old love deity apparently enjoys a good challenge.`,
      `A colony of bats erupts from a hidden alcove as you trigger a tripwire. In the chaos, you retreat to safety. The Candle Shard flickers tauntingly from the altar. You'll need to try again.`,
    ],
    outcomes: {
      low: `You trigger every trap in the book. Darts, rolling stones, a very confused colony of bats. By the time you reach the altar, your hair is a mess and your dignity is in tatters—but the Candle Shard is yours.

{bardName}'s voice echoes in your memory: "Grace isn't about never falling. It's about looking fabulous while getting back up."`,

      mid: `You navigate the traps with careful precision, only setting off one harmless burst of ancient confetti. (The love deity apparently had a sense of humor.) The Candle Shard gleams in your hand.

A warm breeze passes through the ruins, almost like a blessing from the old deity herself.`,

      high: `You move through the ruins like a dancer—each step perfect, each dodge graceful. The altar seems to glow brighter as you approach, as if the old love deity herself recognizes a kindred spirit.

{bardName} would compose an entire ballad about this. The Candle Shard pulses warmly in your hand, and for a moment, the ancient temple feels alive again.`,
    },
  },
};

// -------------------------------------------------------
//  BOSS SCENE
// -------------------------------------------------------
export const bossScene = {
  title: 'The Mischief Imp of Envy',
  narrative: `The three shards pulse with warmth in your pack as you return to the crossroads. But waiting there, perched on a twisted stump, is a small creature with sad, glittering eyes and tattered butterfly wings—the Mischief Imp of Envy.

"You can't have it!" the imp squeaks, clutching a fragment of shadow to its chest. "Everyone gets love and gifts and festivals, and nobody EVER invites me!"

Its lower lip trembles. Even mischief-makers get lonely sometimes.`,

  choices: [
    {
      id: 'heart',
      label: '💛 Appeal to its lonely heart',
      outcome: `You kneel before the imp and speak gently. "Everyone deserves to feel loved—even mischief imps. Come to the festival with us. There's room for one more."

Tears well in the imp's enormous eyes. "R-really? You mean it?"

It releases the shadow fragment, which dissolves into golden light. The imp does a tiny happy dance, its wings fluttering with newfound joy.`,
    },
    {
      id: 'rhyme',
      label: '📝 Challenge it to a rhyme duel',
      outcome: `"If I win," you declare, "you release the Heartstone fragment." The imp's eyes light up with competitive glee—finally, someone who plays games!

After three rounds of increasingly ridiculous couplets (you rhyme "festival" with "whimsical"), the imp concedes defeat—laughing harder than it has in centuries.

"Fine, fine, you win! That was the most fun I've had in… ever." The shadow dissolves into light as the imp giggles.`,
    },
    {
      id: 'cupcake',
      label: '🧁 Offer it a festival cupcake',
      outcome: `You reach into your pack and produce a frosted cupcake—every good adventurer carries one for emergencies.

The imp's eyes go impossibly wide. It takes a tiny, cautious bite… then another… then bursts into tears of joy. "Nobody… nobody ever gave me a CUPCAKE before!"

Through happy sobs, it releases the shadow fragment, which dissolves into warm, golden light.`,
    },
  ],

  resolution: `The three shards float from your pack, spinning in a gentle spiral. They merge with the golden light, each piece clicking into place with a soft, musical chime.

Before you hovers the Heartstone—whole once more—pulsing with gentle warmth and radiance, like a tiny captive sunrise. You can feel its magic singing in your bones.

It's time to return to the festival.`,
};

// -------------------------------------------------------
//  FESTIVAL SCENE
// -------------------------------------------------------
export const festivalScene = {
  title: 'The Festival of Hearts',
  narrative: `The town square erupts in cascading light as {bardName} places the restored Heartstone into the great festival lantern. A wave of warm, golden radiance washes over the cobblestones—and one by one, every lantern in the square flickers to life.

Paper roses seem to bloom into real ones. Music swells from every corner. Couples dance beneath strings of enchanted lights, and children chase fireflies that leave trails of golden dust.

It is everything you fought for—and more.

{bardName} turns to you, lute slung over his shoulder, that familiar smile on his face. But it's softer now. More earnest. More vulnerable.

"You were magnificent today, {protagonistName}. Truly." He extends his hand, and something in his eyes makes your heart skip. "Walk with me? There's something I've been meaning to say… away from the crowd."`,
};

// -------------------------------------------------------
//  PROPOSAL SCENE
// -------------------------------------------------------
export const proposalScene = {
  title: 'A Private Moment',
  prelude: `{bardName} leads you to a quiet garden at the edge of the festival grounds, where paper lanterns sway in a gentle breeze and a fountain murmurs melodies older than memory.

He sets down his lute—the one thing he never lets go of—takes a breath, and meets your eyes.`,

  speechLines: [
    '"When the Heartstone shattered, I wasn\'t afraid for the festival. I was afraid I\'d never get this moment with you."',
    '"I\'ve traveled far, {protagonistName}. I\'ve sung for kings and queens, played in halls of marble and gold. But no song I\'ve ever written captures what I feel when I\'m near you."',
    '"You braved enchanted forests, outsmarted magical merchants, and befriended an imp with emotional issues—all to save a festival."',
    '"But I have a confession…"',
    '"I asked you to find those shards not just to save the Festival of Hearts. I wanted one more adventure with you. One more reason to see you smile."',
    '"And now, standing here, in this garden, with the stars as my witness…"',
  ],
};

// --- Valentine Roll Outcomes ---
export const valentineRollOutcomes = {
  low: 'Nat {roll}. A critical fumble… straight into {bardName}\'s arms. Some failures are the greatest victories of all.',
  mid: 'You rolled a {roll}. The dice land on their edge for a breathless moment—then tip toward YES. Even fate ships it.',
  high: 'Natural {roll}! Great success—{bardName}\'s heart is yours. (As if there was ever any doubt.)',
  nat20: 'NATURAL 20! The dice EXPLODE with golden light. Somewhere, a choir of angels starts singing. The universe itself approves.',
};

// -------------------------------------------------------
//  END SCENE
// -------------------------------------------------------
export const endScene = {
  title: 'And So It Was Written…',
  narrative: `The garden fills with soft, golden light. The Heartstone glows brighter, as if it knows. Somewhere, a choir of enchanted songbirds begins to sing a melody that sounds suspiciously like a love ballad {bardName} once hummed.

He pulls you close, and the festival fireworks paint the sky in colors you've never seen—rose and gold and the deep purple of twilight.

And in this moment, in a world of magic and wonder, two hearts find their forever.`,

  keepsake: `\u2726 The Ballad of {protagonistName} & {bardName} \u2726

On the day the Heartstone broke,
a hero answered duty's call.
Through whispering woods and moonlit stalls,
through ancient ruins, past crumbled walls.

She braved the imp, restored the light,
and saved the Festival of Hearts that night.

But the greatest treasure found that day
wasn't a gem or golden ray—
it was the love that lit the way.

\u2665 Happy Valentine's Day \u2665

— With all my heart, {bardName}`,
};
