// The dumbest shooting range simulator on earf
// Courtesy of Bruce Lee

/*
    A thing that goes "bang"
    name - string - name of the gun
    type - string - description of the type of gun
    range - int - effective range, in feet
    auto - bool - if the weapon is full-auto or not
    db - int - loudness of the weapon, in decibels
    magSize - int - number of current rounds the weapon's magazine contains
	maxMagSize - int - max possible rounds current magazine can hold
    ammoType - string - name of ammunition type
    bullet - int - base damage of the bullet
    melee - int - base damage of the gun when you're using it wrong

*/
function Gun(name, type, range, auto, db, magSize, maxMagSize, ammoType, bullet, melee) {
    // Properties
    // Basic properties
    this.name = name;
    this.type = type;
    this.range = range;
    this.isFullAuto = auto;
    this.noise = db;
    this.magSize = magSize;
	this.maxMagSize = maxMagSize;
    this.ammoType = ammoType;
    this.bulletDamage = bullet;
    this.meleeValue = melee;

    // Secondary fire mode properties
    this.secondaryFire = false;
    this.secondaryFireAmmo = null;
	this.secondaryFiremaxMag = null;
	this.secondaryDamage = null;
	this.ammoSecondaryType = null;

    // Modifiers
    this.rangeModifier = 0;
    this.scopeAttached = false;
	this.magAttached = false;
	this.silencerAttached = false;
	this.bayonetAttached = false;
    this.noiseModifier = 0;
    this.magModifier = null;
    this.damageModifier = 0;
    this.accuracyModifier = 0;
    this.meleeValueModifier = 0;

    // Methods
    /*
	NOTES:
	Moved the methods to here instead of gun.prototype because we do not want to modify the object that the gun extends... which is the Object object.
	Meaning that, before, *all* objects had a SprayAndPray method.
	However, if you make a new object that derives from gun, you can use myObject.prototype.myMethod to add myMethod to the gun object.
    */

    /*
	Adds an attachment to the gun
	attachment - string - name of attachment to apply
    */
    this.addAttachment = function(attachment) {
	var output = "";

	switch(attachment) {
	    case "GP-30 grenade launcher":
		if (this.type === "russian assault rifle") {
		    this.secondaryFire = true;
		    this.secondaryFireAmmo = 1;
			this.secondaryFiremaxMag = 1;
			this.secondaryDamage = 300;
			this.ammoSecondaryType = "grenades";
			document.getElementById("grenadeLauncherAttachment").innerHTML = "<img src=\"images/interface/grenadeLauncherAttached.png\">";
		    output = "<p> <img src=\"images/interface/grenadeLauncherAttached.png\"> The GP-30 grenade launcher slides onto the rails under your "+ this.name +". The smell of gun grease and sweat wafts up from the heat that radiates off of the ground and into your nostrils as a sickly sweet aroma. You grin slightly, cocking the weapon to the side to admire your handiwork and slide a grenade into your newly attached piece of hardware. It is now ready to fire. <span class=\"update\">Click the grenade icon in the secondary fire pane, and then on the target you wish to attack!</span> </p>";
		} else {
		    output = "<p>You can only use this attachment with a russian-made assault rifle. </p>";
		}
	    break;

	    case "Red dot sight":
		this.rangeModifier = 20;
		this.scopeAttached = true;
		document.getElementById("scopeAttachment").innerHTML = "<img src=\"images/interface/scopeAttached.png\">";
		output = "<p> <img src=\"images/interface/scopeAttached.png\"> Your red dot sight slides into position with a slight *click*. You check your sights and make the necessary adjustments. Good to go. You now have a " + this.rangeModifier + " point accuracy bonus. </p>";
	    break;

	    case "Reflex sight":
		this.rangeModifier = 10;
		this.scopeAttached = true;
		document.getElementById("scopeAttachment").innerHTML = "<img src=\"images/interface/scopeAttached.png\">";
		output = "<p> <img src=\"images/interface/scopeAttached.png\"> Your reflex sight attaches with no issue. You tweak the settings until you are happy with them and begin staring down the sights intently for the kill. </p>";
	    break;

	    case "6H5 type bayonet":
		this.bayonetAttached = true;
		this.meleeValueModifier = 20;
		document.getElementById("bayonetAttachment").innerHTML = "<img src=\"images/interface/bayonetAttached.png\">";
		output = "<p> <img src=\"images/interface/bayonetAttached.png\"> You affix the 6H5 type bayonet to the end of your weapon and let loose a maniacal guffaw! You now have a [20] point damage bonus for melee attacks.</p>";
	    break;

	    case "Silencer":
		this.silencerAttached = true;
		this.noiseModifier = 40;
		document.getElementById("silencerAttachment").innerHTML = "<img src=\"images/interface/silencerAttached.png\">";
		output = "<p><img src=\"images/interface/silencerAttached.png\"> You screw the silencer onto the end of your weapon with no problems. </p>";
	    break;

	    case "Extended Magazine":
	    this.magModifier = 54;
		this.magAttached = true;
	    this.magSize = (this.magModifier + this.magSize);
		this.maxMagSize = (this.magModifier + this.magSize);
		document.getElementById("magAttachment").innerHTML = "<img src=\"images/interface/magAttached.png\">";
		output = "<p> <img src=\"images/interface/magAttached.png\"> You slide in a fresh drum magazine for your " + this.name + ". It pops into place with a satisfying clicking noise. A wicked grin pulls at the corners of your lips and you begin checking your sights. " + "Your total magazine capacity for this gun has been upgraded to " + this.magSize + " shots of " + this.ammoType + ". </p>";
        break;

	    case "Standard magazine (AK)":
		this.magModifier = 0;
		this.magSize = 15;
		this.maxMagSize = 15;
		this.magAttached = false;
		document.getElementById("magAttachment").innerHTML = "<img src=\"images/interface/magAttachedno.png\">";
		output = "<p> <img src=\"images/interface/magAttachedno.png\"> You slide in a standard 15 round magazine for your " + this.type + ". </p>";
	    break;

		
		case "Standard iron sights":
		this.rangeModifier = 0;
		this.scopeAttached = false;
		document.getElementById("scopeAttachment").innerHTML = "<img src=\"images/interface/scopeAttachedno.png\">";
		output = "<p> <img src=\"images/interface/scopeAttachedno.png\"> You remove the scope from your weapon and go back to using your standard iron sights.</p>";
		break;
		
		case "no bayonet":
		this.meleeValueModifier = 0;
		this.bayonetAttached = false;
		document.getElementById("bayonetAttachment").innerHTML = "<img src=\"images/interface/bayonetAttachedno.png\">";
	    output = "<p> <img src=\"images/interface/bayonetAttachedno.png\"> You remove the bayonet from your weapon.</p>";
		break;
		
		case "no grenades":
		this.secondaryFire = false;
		this.secondaryFireAmmo = null;
		this.secondaryFiremaxMag = null;
		this.secondaryDamage = null;
		this.ammoSecondaryType = null;
		document.getElementById("grenadeLauncherAttachment").innerHTML = "<img src=\"images/interface/grenadeLauncherAttachedno.png\">";
		output = "<p> <img src=\"images/interface/grenadeLauncherAttachedno.png\"> You detach the grenade launcher from your weapon.</p>";
		break;
		
		case "no silencer":
		this.silencerAttached = false;
		this.noiseModifier = 0;
		document.getElementById("silencerAttachment").innerHTML = "<img src=\"images/interface/silencerAttachedno.png\">";
		output = "<p><img src=\"images/interface/silencerAttachedno.png\"> You unscrew the silencer from the end of your weapon. </p>";
	    break;
		
		default:
		output = "<p>This attachment is nowhere to be found in your pack! Most unfortunate. </p>";
	    break;
	}
	
	

	LogInfo(output);
    } // addAttachment

    /*
	Bust a cap. Or many of them, as the case may be.
	target - object - the thing that you want to make dead
    */
    this.sprayAndPray = function(target){
	var output = "",
	    randomSeed = Math.floor(Math.random() * 10 + 3),
	    newMagSize = 0,
	    damageDealt = 0;

	if (!target.dead && target.isAlive) {
	    if (this.isFullAuto) {
		
		// Checks to see if we have enough ammo and fires if we do!
		if (this.magSize >= 3) {
		    newMagSize = this.magSize - randomSeed;
		    damageDealt = this.bulletDamage * randomSeed;
		    output = "<p><span class =\"update\">You switch your " + this.type +" over to full-auto and throw some hot lead downrange with your "+ this.name +"!</span><span class =\"alert\"> *BRRRRAPP!*</span> You fired " + randomSeed + " shots for a combined total damage score of "+ damageDealt + " ("+ this.bulletDamage + " per round).</p>";
		} else {
		    output = "<p>Please reload your weapon.</p>";
		}
	    } else {
		output = "<p>You cannot spray and pray with a non-automatic weapon. Try taking an aimed shot instead.</p>";
	    }

	    if (damageDealt > target.health && target.isAlive && target.isLiving) {
		target.dead = true;
		output += "<p><span class =\"alert\">[CRITICAL HIT]</span> <span class =\"update\">Your attack installed a new moonroof in the back of " + target.name + "'s head courtesy of your " + this.type +", Effectively killing the *shit* out of it! </span><span class =\"alert\">" + target.deathKnell + "</span> You have " + newMagSize + " rounds of " + this.ammoType + " left!</p>";
	    } else if (damageDealt === target.health && target.isAlive && target.isLiving) {
		target.dead = true;
		output += "<p><span class =\"update\">You scored a direct hit on " + target.name + "! " + " blood spurts from an artery, and they drop to the floor still twitching.</span> <span class =\"alert\">" + target.deathKnell + "</span> You have " + newMagSize + " rounds of " + this.ammoType +" left!</p>";
	    } else if (damageDealt >= target.health && target.isAlive && !target.isLiving) {
		target.dead = true;
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
		output += "<p><span class =\"update\">You destroyed the " + target.name + "! </span><span class =\"alert\">" + target.deathKnell + "</span> You have " + newMagSize + " shots of " + this.ammoType + " left!</p>";
	    } else {
		target.health = target.health - damageDealt;
		this.magSize = newMagSize;
	    output += "<p><span class=\"update\"> Your volley of shots strikes "+ target.name + ". They now have " + target.health + " health left."+ "</span><span class=\"alert\"> " + target.hitSound + "</span> You now have " + newMagSize +" Rounds of "+ this.ammoType +" left.</p>";
	    }
	} else {
	    output = "<p><span class =\"alert\">[ATTACK FAILED - TARGET ALREADY NEUTRALIZED]</span> HE'S DEAD, JIM. LET IT GO!</p>";
	}

	LogInfo(output);
    } // sprayAndPray
	
	

	// Bust *a* cap. in the singular case this time! Arriba!
	this.aimedShot = function(target){

	var output = "";

	// is it dead?
    if (!target.dead) {	
	
		 newMagSize = 0;
	     damageDealt = 0;
		
	// do we have enough ammo? if so let's rock!
	if (this.magSize >= 1) {	
		newMagSize = this.magSize - 1;
	    damageDealt = this.bulletDamage;		
	if (damageDealt > target.health && target.isLiving === true) {
	    target.dead = true;
		this.magSize = newMagSize;
	    output += "<p><span class=\"alert\">[CRITICAL HIT]</span> <span class=\"update\">Your attack installed a new moonroof in the back of " + target.name + "'s head courtesy of your " + this.type +", Effectively killing the *shit* out of it! " + target.deathKnell + "</span> You now have " + newMagSize +" Rounds of "+ this.ammoType +" left.</p>";
	} else if (damageDealt === target.health && target.isLiving === true) {
	    target.dead = true;
		this.magSize = newMagSize;
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">You scored a fatal hit on " + target.name + "! " + " blood spurts from an artery in a glorious crimson fountain in front of them, and they drop to the floor still twitching.</span><span class=\"alert\"> " + target.deathKnell + "</span> You now have " + newMagSize +" Rounds of "+ this.ammoType +" left.</p>";
	} else if (damageDealt >= target.health && !target.isLiving) {
	    target.dead = true;
		this.magSize = newMagSize;
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">You destroyed the " + target.name + "! " + target.deathKnell + "</span></p>";
	} else {
	    target.health = target.health - damageDealt;
		this.magSize = newMagSize;
	    output += "<p><span class=\"update\"> Steadying your weapon, you level a well-placed shot into "+ target.name + " For [" + this.bulletDamage + "] points of damage. They now have " + target.health + " health left."+ "</span><span class=\"alert\"> " + target.hitSound + "</span> You now have " + newMagSize +" Rounds of "+ this.ammoType +" left.</p>";
	}	
	}else{
	output += "<p><span class=\"alert\">Please reload your weapon</span></p>";
	}		
	}else{
	output = "<p><span class=\"alert\">[ATTACK FAILED - TARGET ALREADY NEUTRALIZED]</span> HE'S DEAD, JIM. LET IT GO!</p>";
	}
	LogInfo(output);
	} // Aimed shot
	
	

	// Gettin' stabby with it (melee)!

	this.attackMelee = function(target){

	var output = "";

	// is it dead?
    if (!target.dead) {	
	
	     damageDealt = this.meleeValueModifier + this.meleeValue;
				
	if (damageDealt > target.health && target.isLiving === true) {
	    target.dead = true;
	    output += "<p><span class=\"alert\">[CRITICAL HIT]</span> <span class=\"update\">You completely decapitated " + target.name + " with your insane melee skills, Effectively killing the *shit* out of it! " + target.deathKnell + "</span></p>";
	} else if (damageDealt === target.health && target.isLiving === true) {
	    target.dead = true;
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">You land a devastating blow on " + target.name + "! " + " blood pours from a wound you have left in their throat, and they drop to the floor still twitching.</span><span class=\"alert\"> " + target.deathKnell + "</span></p>";
	} else if (damageDealt >= target.health && !target.isLiving) {
	    target.dead = true;
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">You destroyed the " + target.name + "! " + target.deathKnell + "</span></p>";
	} else {
	    target.health = target.health - damageDealt;
	    output += "<p><span class=\"update\"> You swing frantically at "+ target.name + " For [" + damageDealt + "] points of damage. They now have " + target.health + " health left."+ "</span><span class=\"alert\"> " + target.hitSound + "</span></p>";
	}	
	}else{
	output = "<p><span class=\"alert\">[ATTACK FAILED - TARGET ALREADY NEUTRALIZED]</span> HE'S DEAD, JIM. LET IT GO!</p>";
	}
	LogInfo(output);
	} // attackMelee
	
	
	// Lob a grenade!
	this.grenade = function(target){
	var output = "";

	// is it dead?
    if (!target.dead) {	
	
		 newSecondaryMagSize = 0;
	     damageDealt = 0;
		
	// do we have enough ammo? if so let's rock!
	if (this.secondaryFireAmmo >= 1) {	
		newSecondaryMagSize = this.secondaryFireAmmo - 1;
	    damageDealt = this.secondaryDamage;		
	if (damageDealt > target.health && target.isLiving === true) {
	    target.dead = true;
		this.secondaryFireAmmo = newSecondaryMagSize;
		document.getElementById("secondaryAmmo").innerHTML = "<img class=\"secondaryfired\" src=\"images/interface/SecondaryEmpty.png\">" + " x " + newSecondaryMagSize + "<img class=\"secondaryreload\" onclick=\"onSecReloadClick()\" src=\"images/interface/reloadSecondary.png\">";
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"alert\">[CRITICAL HIT]</span> <span class=\"update\">Your attack obliterated " + target.name + ". " + target.deathKnell + "</span> You now have " + newSecondaryMagSize +" Rounds of "+ this.ammoSecondaryType +" left.<span class=\"update\"> Please press reload in the secondary fire panel to insert a new grenade and fire another shot.</span></p>";
	} else if (damageDealt === target.health && target.isLiving === true) {
	    target.dead = true;
		this.secondaryFireAmmo = newSecondaryMagSize;
		document.getElementById("secondaryAmmo").innerHTML = "<img class=\"secondaryfired\" src=\"images/interface/SecondaryEmpty.png\">" + " x " + newSecondaryMagSize + "<img class=\"secondaryreload\" onclick=\"onSecReloadClick()\" src=\"images/interface/reloadSecondary.png\">";
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">The explosion splatters " + target.name + " all over the room! </span><span class=\"alert\"> " + target.deathKnell + "</span> You now have " + newSecondaryMagSize +" Rounds of "+ this.ammoSecondaryType +" left.<span class=\"update\"> Please press reload in the secondary fire panel to insert a new grenade and fire another shot.</span></p>";
	} else if (damageDealt >= target.health && !target.isLiving) {
	    target.dead = true;
		this.secondaryFireAmmo = newSecondaryMagSize;
		document.getElementById("secondaryAmmo").innerHTML = "<img class=\"secondaryfired\" src=\"images/interface/SecondaryEmpty.png\">" + " x " + newSecondaryMagSize + "<img class=\"secondaryreload\" onclick=\"onSecReloadClick()\" src=\"images/interface/reloadSecondary.png\">";
		document.getElementById("questWindow").innerHTML = "<img class=\"target\" src=\"images/targets/"+ target.deathAnim +"\">";
	    output += "<p><span class=\"update\">You exploded the " + target.name + "! " + target.deathKnell + "</span></p>";
	} else {
	    target.health = target.health - damageDealt;
		this.secondaryFireAmmo = newSecondaryMagSize;	
		document.getElementById("secondaryAmmo").innerHTML = "<img class=\"secondaryfired\" src=\"images/interface/SecondaryEmpty.png\">" + " x " + newSecondaryMagSize + "<img class=\"secondaryreload\" onclick=\"onSecReloadClick()\" src=\"images/interface/reloadSecondary.png\">";
	    output += "<p><span class=\"update\"> You launch a well-placed shot with one of your " + this.ammoSecondaryType + ". "+ target.name + " was hit For a whopping [" + this.secondaryDamage + "] points of damage. They now have " + target.health + " health left."+ "</span><span class=\"alert\"> " + target.hitSound + "</span> You now have " + newSecondaryMagSize +" Rounds of "+ this.ammoSecondaryType +" left in your launcher.<span class=\"update\"> Please press reload in the secondary fire panel to insert a new grenade and fire another shot.</span></p>";
	}	
	}else{
	output += "<p><span class=\"alert\">Please reload your grenade launcher</span></p>";
	}		
	}else{
	output = "<p><span class=\"alert\">[ATTACK FAILED - TARGET ALREADY NEUTRALIZED]</span> HE'S DEAD, JIM. LET IT GO!</p>";
	}
	LogInfo(output);
	} // Grenade
	
	
	
	//reload function
	this.reload = function(){
	
		currentRounds = this.magSize + this.magModifier;
	
		if( currentRounds === this.maxMagSize){
		
		output = "You do not need to reload this weapon.";
		
		}else{
		
		amountToReload = this.maxMagSize - currentRounds;
		this.magSize = this.magSize + amountToReload;
		output = "You reload your weapon. You now have " + this.magSize + " rounds of " + this.ammoType + ".";
		LogInfo(output);
		
		}
	}// reload
	
	
	
	//secondary reload function (used for alt. fire weapons)
	this.secondaryReload = function(){
	
		AKS74u.secondaryFireAmmo = 1;
		document.getElementById("secondaryAmmo").innerHTML = "<img ID=\"fireSecondary\" onclick=\"onClickFireSecondary()\" src=\"images/interface/Secondary.png\">" + " x " + AKS74u.secondaryFireAmmo;
		output = "You reload another grenade";
		LogInfo(output);
	}// secondary reload
	
	
	} // Gun





/*
    Makin' babies
    name - string - name of the person
    stance - string - the stance the person has taken (affects accuracy)
    perception - int - how perceptive the person is (affects accuracy)
    taunt - string - what they yell
	currentAttackMode - uses property for the type of attack you want to perform
*/
function Person(name, stance, perception, taunt){
    this.name = name;
    this.stance = stance;
    this.perception = perception;
    this.taunt = taunt;
    this.weapon = null;
	
	/* 
	current attack mode property for players (starts as single shot)
	*/
	this.currentAttackMode = "single";

    /*
	Go ahead, give them a gun, see if I care.
	gun - object - the gun to equip them with
    */
    this.arm = function(gun) {
	this.weapon = gun;
    }

    /*
	Attacks with the current weapon
	target - object - the thing you want to attack
    */
    this.attack = function(target) {
	this.weapon.sprayAndPray(target);
    }
	
	/*
	Attacks with single shot
	*/
	this.attackSingle = function(target) {
	this.weapon.aimedShot(target);
    }
	
	/*
	Attacks with melee
	*/
	this.attackMelee = function(target) {
	this.weapon.attackMelee(target);
    }
	
	/*
	Attacks with grenade
	*/
	this.attackGrenade = function(target) {
	this.weapon.grenade(target);
    }
	
} // Person

/*
    The things you shoot at
    name - string - the name of the thing you're about to kill
    health - int - the amount of damage a target can sustain
	maxHealth - int - the most health a target can possibly have (used for targeting system overlay)
    deathKnell - string - the sound it makes you kill it
	hitSound - string - sound a target makes when they get hit but don't die
	deathAnim - string - Link to the target's death animation for the quest window
*/
function Target(name, health, maxHealth, isLiving, deathKnell, hitSound, deathAnim) {
    this.name = name;
    this.health = health;
	this.maxHealth = maxHealth;
	this.isLiving = isLiving;
    this.deathKnell = deathKnell;
    this.isAlive = true;
	this.hitSound = hitSound;
	this.deathAnim = deathAnim;
} // target

/*
    Output text to the page
    msg - string - text to write to the page
	edited this to run an additional check on our targeting event handler
	and determine if any of our enemies are vanquished
*/
function LogInfo(msg) {
    var screenage = document.getElementById("screenage");

    screenage.innerHTML = screenage.innerHTML + msg;
	
	// Autoscroll on new events! clevah girl.. 
	screenage.scrollTop = screenage.scrollHeight;
	
} // LogInfo

// Things that are doin' stuff - declare them in a comma-separated block because some shady-looking guy told me that was more efficient
var ammoTypes = ["5.45x39mm", "5.45x39mm tracers", "5.45x39mm subsonic", "GP-30 grenade (HE)"],
    attachments = ["GP-30 grenade launcher", "Red dot sight", "Reflex sight", "6H5 type bayonet", "Silencer", "Extended Magazine", "Standard magazine (AK)", "Standard iron sights", "no bayonet", "no grenades", "no silencer"],
    AKS74u = new Gun("AKS-74u", "russian assault rifle", 2051, true, 168, 15, 15, ammoTypes[0], 20, 10),
    vaultDweller = new Person("Vault Dweller", "standing", 40, "You ain't been in combat until you've pulled an eyeball out of your pocket!"),
    mingvase = new Target("Ming vase", 480, 480, false, "*sound of broken ancient pottery*", "CLINK!","mingdeath.gif", false, false),
    pig = new Target("a cute little pig that never hurt no one", 100, 100, true, "SQUEEEEEAL!!!", "GRR! OINNNK!!!","undefined.gif", true, false);

	
	
/*
    Event handler for Spray and Pray button
*/
function onSprayAndPrayClick() {

    vaultDweller.currentAttackMode = "sprayAndPray";
	output = "<p> You switch your weapon over to full-auto. <span class=\"update\">Click the target you want to fire at! </span></p>";
	
	LogInfo(output);
	/*
	
	Old code
	// Pimp that gun
    AKS74u.addAttachment(attachments[5]);

    // Give it to a dude
    vaultDweller.arm(AKS74u);
    vaultDweller.attack(mingvase);
	targetingOverlay(mingvase);
	*/
} // onSprayAndPrayClick


/*
    Event handler for Aimed shot button
*/
function onAimedShotClick() {
   vaultDweller.currentAttackMode = "single";
   output = "<p> You switch your weapon over to single-shot mode. <span class=\"update\">Click the target you want to fire at!</span> </p>";
   
   LogInfo(output);
/*
   Old code
   // Pimp that gun
    AKS74u.addAttachment(attachments[5]);

    // Give it to a dude
    vaultDweller.arm(AKS74u);
    vaultDweller.attackSingle(pig);
	targetingOverlay(pig);	
	*/
} // onSprayAndPrayClick


/*
    Event handler for melee button
*/
function onMeleeClick() {

    vaultDweller.currentAttackMode = "Melee";
	output = "<p> You ready your weapon to deliver a crushing strike to your opponent. <span class=\"update\">Click the target you want to take a swing at at! Go get 'em slugger!</span></p>";
	
	LogInfo(output);
}//onMeleeClick

/*
    Event handler for grenade button
*/
function onClickFireSecondary() {

    vaultDweller.currentAttackMode = "grenade";
	output = "<p> Grenade ready! <span class=\"update\">Click the target you want to blow to smithereens!</span></p>";
	
	LogInfo(output);
}//onMeleeClick

/*
    Event handler for Target click (attack)
*/
function onTargetClick(){

		if( vaultDweller.currentAttackMode === "single"){
		vaultDweller.arm(AKS74u);
		vaultDweller.attackSingle(mingvase);
		targetingOverlay(mingvase);
		
		} else if(vaultDweller.currentAttackMode === "Melee"){
		
		vaultDweller.arm(AKS74u);
		vaultDweller.attackMelee(mingvase);
		targetingOverlay(mingvase);
		
		} else if(vaultDweller.currentAttackMode === "sprayAndPray"){
		
		vaultDweller.arm(AKS74u);
		vaultDweller.attack(mingvase);
		targetingOverlay(mingvase);
		
		} else if(vaultDweller.currentAttackMode === "grenade"){
		
		vaultDweller.arm(AKS74u);
		vaultDweller.attackGrenade(mingvase);
		targetingOverlay(mingvase);
		
		}else{
		
		output = "Select a fire mode first!";
		LogInfo(output);
		}

	
} //onTargetClick


/*
	Event handler for scope attachments
*/

function onScopeAttachClick(){

	if (!AKS74u.scopeAttached){
	AKS74u.addAttachment(attachments[1]);
} else {
	AKS74u.addAttachment(attachments[7]);

}
screenage.scrollTop = screenage.scrollHeight;
}	// scopeAttachments

/*
	Event handler for bayonet attachments
*/


function onBayonetAttachClick(){

	if (!AKS74u.bayonetAttached){
	AKS74u.addAttachment(attachments[3]);
} else {
	AKS74u.addAttachment(attachments[8]);

}
screenage.scrollTop = screenage.scrollHeight;
}	// scopeAttachments

/*
	Event handler for mag attachments (for some reason you have to click it twice to get it to work? wtf.
*/

function onMagAttachClick(){


	if (!AKS74u.magAttached){
	AKS74u.addAttachment(attachments[5]);
} else {
	AKS74u.addAttachment(attachments[6]);


}
screenage.scrollTop = screenage.scrollHeight;
}	// magAttachments


/*
	Event handler for grenade launcher attachments
*/

function onGrenadeAttachClick(){

	if (!AKS74u.secondaryFire){	
	AKS74u.addAttachment(attachments[0]);
	document.getElementById("secondaryAmmo").innerHTML = "<img ID=\"fireSecondary\" onclick=\"onClickFireSecondary()\" src=\"images/interface/Secondary.png\">" + " x " + AKS74u.secondaryFireAmmo;
} else {

	AKS74u.addAttachment(attachments[9]);
	document.getElementById("secondaryAmmo").innerHTML = "<img src=\"images/interface/noSecondary.png\">";
}
screenage.scrollTop = screenage.scrollHeight;
}	// grenade Attachment

/*
	Event handler for silencer attachments
*/

function onSilencerAttachClick(){

	if (!AKS74u.silencerAttached){
	AKS74u.addAttachment(attachments[4]);
} else {
	AKS74u.addAttachment(attachments[10]);

}
screenage.scrollTop = screenage.scrollHeight;
}	// silencer Attachment


/*
	Event handler for reload
*/
function onReloadClick(){

AKS74u.reload();


} // onReloadClick


/*
	Event handler for secondary reload
*/
function onSecReloadClick(){

AKS74u.secondaryReload();


} // onSecReloadClick



/*
	Event handler for targeting display
	Should display a little green dude in a hat for each living target that we can 
	click to load into our attack methods, a little yellow dude for thsoe you've damaged,
	and a little skull for ones you've capped.. right now it should just show if 
	there are living targets in the area or not.
*/

function targetingOverlay(target){
 
	// A simple check that uses the new target.property maxHealth and find half of that
	fiddyPercent = target.maxHealth / 2;
	
	if(target.dead){
	document.getElementById("portrait").innerHTML = "<img class=\"target\" src=\"images/interface/invalidtarget.png\">";
	document.getElementById("health").innerHTML = "<p>0" + "/" + target.maxHealth + "</p>";
		}else if(target.health <= fiddyPercent){
	document.getElementById("portrait").innerHTML = "<img class=\"target\" src=\"images/interface/erniecrit.png\">";
	document.getElementById("health").innerHTML = "<p>" + target.health + "/" + target.maxHealth + "</p>";
		}else{
	document.getElementById("portrait").innerHTML = "<img class=\"target\" src=\"images/interface/ernie.png\">";
	document.getElementById("health").innerHTML = "<p>" + target.health + "/" + target.maxHealth + "</p>";
		}
	
} // targeting event handler


// yo other misc interface stuff here
function popup(url){

	// aww poor widdle baby doesn't know how to play games? let's make a help file to get them on track.
	newwindow=window.open(url,'name','height=400,width=256');
	if (window.focus) {newwindow.focus()}
	return false;
}  // help window popup


