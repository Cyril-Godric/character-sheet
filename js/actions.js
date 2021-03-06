
/**
 * SKILLS
 */

// view the details of a skill
function viewSkill (target) {
    // global variable - saves last used skill
    skillData = characterData.skills[target];

    skillData['title'] = "Skill check";
    skillData['rollcomps'] = [
        {'number' : roll("1d20"),
         'desc' : '<strong>base</strong> (1d20)',
         'spec' : ''},
        {'number' : getAttributeMod(skillData.attribute),
         'desc' : '<strong>'+skillData.attribute+'</strong> mod',
         'spec' : '+'}
    ]

    skillData['sum'] = sumArray(skillData['rollcomps'], 'number');
    skillData['attributeMod'] = getAttributeMod(skillData['attribute']);

    openModal("Roll a Skill", Mustache.render(templates.viewSkill, skillData));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['edit-or-roll'], {type: "Skill", name: skillData.name}));
}

// edit the details of a skill
function editSkill() {
    var data = [];
    data['formRows'] = [
        {'key' : 'name',
         'label' : 'Skill Name',
         'value' : skillData['name'],
         'placeholder' : '',
        },
        {'key' : 'attribute',
         'label' : 'Attribute',
         'value' : skillData['attribute'],
         'placeholder' : '',
        },
        {'key' : 'description',
         'label' : 'Description',
         'value' : skillData['description'],
         'placeholder' : '',
        }
    ]

    $('#roll-modal .modal-body').html(Mustache.render(templates['editForm'], data));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['cancel-or-save'], {type: "Skill"}));
}

// create a new skill
function newSkill() {
    skillData = [];
    openModal("Create a New Skill", Mustache.render(templates.viewSkill, skillData));
    editSkill();
}

// Saves user-entered data to characterData
function saveSkill() {
    saveType(characterData.skills);
}

// roll a skill check
function rollSkill (){
    msgForDM = {'message' : "Report this result to your DM."};
    skillData['roll'] = skillData['baseRoll'] + skillData['attributeMod'];
    dieAnimation(Mustache.render(templates.rollMods, skillData) + Mustache.render(templates.dmPrompt, msgForDM));
}

/**
 * SPELLS
 */

// view the details of a spell
function viewSpell (target){
    // global variable - saves last used spell
    spellData = characterData.spells[target];
    spellData['spellDC'] = 10 + getAttributeMod(spellData.attribute);
    spellData['attributeMod'] = getAttributeMod(spellData.attribute);

    openModal("Cast a Spell", Mustache.render(templates.viewSpell, spellData));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['edit-or-roll'], {type: "Spell"}));
}

// edit the detauls of a spell
function editSpell() {
    var data = [];
    data['formRows'] = [
        {
         'key' : 'name',
         'label' : 'Spell Name',
         'value' : spellData['name'],
         'placeholder' : '',
        },
        {'key' : 'attribute',
         'label' : 'Attribute',
         'value' : spellData['attribute'],
         'placeholder' : '',
        },
        {'key' : 'description',
         'label' : 'Description',
         'value' : spellData['description'],
         'placeholder' : '',
        },
        {'key' : 'damage',
         'label' : 'Damage Die',
         'value' : spellData['damage'],
         'placeholder' : '',
        },
        {'key' : 'damage-type',
         'label' : 'Damage Type',
         'value' : spellData['damage-type'],
         'placeholder' : '',
        }
    ]

    $('#roll-modal .modal-body').html(Mustache.render(templates['editForm'], data));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['cancel-or-save'], {type: "Spell"}));
}

// roll the damage of a spell
function rollSpell (){
    spellData['title'] = "Spell damage roll";
    spellData['rollcomps'] = [{'number' : roll(spellData.damage),
                               'desc' : '<strong>base</strong> ('+spellData.damage+')',
                               'spec' : '+'}]
    spellData['sum'] = sumArray(spellData['rollcomps'], 'number');
    msgForDM = {'message' : "Report this damage and the Spell DC to the DM."};
    dieAnimation(Mustache.render(templates.rollMods, spellData) + Mustache.render(templates.dmPrompt, msgForDM));
}

// create a new spell
function newSpell() {
    spellData = [];
    openModal("Create a New Spell", Mustache.render(templates.viewspell, spellData));
    editSpell();
}

// Saves user-entered data to characterData
function saveSpell() {
    saveType(characterData.spells);
}

/**
 * ATTACKS
 */

// view the details of an attack
function viewAttack (target){
    // global variable - saves last used attack
    attackData = characterData.attacks[target];
    attackData['attributeMod'] = getAttributeMod(attackData.attribute);

    openModal("Make an Attack", Mustache.render(templates.viewAttack, attackData));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['edit-or-roll'], {type: "Attack"}));
}

// edit the details of an attack
function editAttack() {

    var data = [];
    data['formRows'] = [
        {'key' : 'name',
         'label' : 'Attack Name',
         'value' : attackData['name'],
         'placeholder' : '',
        },
        {'key' : 'description',
         'label' : 'Description',
         'value' : attackData['description'],
         'placeholder' : '',
        },
        {'key' : 'damage',
         'label' : 'Damage',
         'value' : attackData['damage'],
         'placeholder' : '',
        },
        {'key' : 'attribute',
         'label' : 'Attribute',
         'value' : attackData['attribute'],
         'placeholder' : '',
        }
    ]

    $('#roll-modal .modal-body').html(Mustache.render(templates['editForm'], data));
    $('#roll-modal .modal-prompt').html(Mustache.render(templates['cancel-or-save'], {type: "Attack"}));
}

// roll the to-hit of an attack, prompt for Hit or Miss
function rollAttack() {
    attackData['title'] = "To-hit roll";

    attackData['rollcomps'] = [
        {'number' : roll("1d20"), 'desc' : '<strong>base</strong> (1d20)',
         'spec' : ''},
        {'number' : attackData['attributeMod'],
         'desc' : '<strong>'+attackData.attribute+'</strong> mod',
         'spec' : '+'}
    ];

    attackData['sum'] = sumArray(attackData['rollcomps'], 'number');
    var msgForDM = {'message' : "Report the to-hit roll to the DM and ask if you hit or miss."};
    dieAnimation(Mustache.render(templates.rollMods, attackData)
                                        + Mustache.render(templates.dmPrompt, msgForDM)
                                        + Mustache.render(templates.confToHit, {}));
}

// roll the damage of an attack
function attackConfirmation (status){
    if (status == "hit"){
        var rollTime = 900;
        attackData['title'] = "Damage roll";

        attackData['rollcomps'] = [
            {'number' : roll(attackData['damage']),
             'desc' : '<strong>base</strong> ('+attackData['damage']+')',
             'spec' : ''},
            {'number' : attackData['attributeMod'],
             'desc' : '<strong>'+attackData.attribute+'</strong> mod',
             'spec' : '+'}
        ];

        attackData['sum'] = sumArray(attackData['rollcomps'], 'number');
        var msgForDM = {'message' : "Report this damage and its type to your DM."};

        var output = Mustache.render(templates.rollMods, attackData);
        output += Mustache.render(templates.dmPrompt, msgForDM);

    } else if (status == "miss") {
        var rollTime = 0;
        var output = "Bummer. Your attack missed.";
    }

    $('#roll-modal .modal-prompt .dm-prompt, .hit-or-miss').remove();
    $(".rollagain").remove();

    $('#roll-modal .modal-prompt').append(templates["die-animation"]);

    setTimeout( function(){
        $(".triangle-isosceles").remove();
        $(".die-animation").remove();
        $('#roll-modal .modal-prompt').append(output);
    }, rollTime);
}

// create a new attack
function newAttack() {
    attackData = [];
    openModal("Create a New Attack", Mustache.render(templates.viewattack, attackData));
    editAttack();
}

// Saves user-entered data to characterData
function saveAttack() {
    saveType(characterData.attacks);
}

// edit ability scores
function editAbility (target) {
    ability = target;
    var data = [];

    data['custom'] = '<div class="form-group"><label class="col-sm-3 control-label">Attribute</label><div class="col-sm-9">' +
'<p class="form-control-static">'+target+'</p></div></div>';

    data['formRows'] = [
        {'key' : 'name',
         'label' : 'Update Value',
         'value' : characterData.abilities[ability],
         'placeholder' : '',
        },
        {'key' : 'comment',
         'label' : 'Comments',
         'value' : "",
         'placeholder' : '',
        }
    ]

    openModal("Edit an Ability Score", Mustache.render(templates['editForm'], data));
        $('#roll-modal .modal-prompt').html(Mustache.render(templates['cancel-or-save'], {type: "Ability"}));
}

// Saves user-entered data to characterData
function saveAbility() {
    var data = $('#editForm').form();
    data['ability'] = ability;
    characterData.abilities[ability] = data['name'];
    saveData();
}

// save character data
function saveCharacter(){
    var data = $('#character form').form()

    // parse data
    characterData['name'] = data['name']
    characterData['class'] = data['class']
    characterData['race'] = data['race']

    // Remove non-numeric entries from HP/AC
    characterData['hp'] = data['hp'].replace(/\D/g,'');
    characterData['ac'] = data['ac'].replace(/\D/g,'');

    saveData();

}

// Replace current character with default character template
function createCharacter() {
    var r = confirm("Are you sure you want to create a new character? Creating a new character will delete your current character, and load the default character template.");

    if (r==true)
    {
        localStorage.clear();
        characterData = originalCharacterData;
        renderCharacterData();

    }  
}

function importCharacter() {
    openModal("Import Character", Mustache.render(templates.importCharacter));
}

function exportCharacter(){
    openModal("Export Character", Mustache.render(templates.exportCharacter, {data : JSON.stringify(characterData)}));
}

function loadCharacter() {
    console.log($("#roll-modal textarea")[0].value);
    characterData = JSON.parse($("#roll-modal textarea")[0].value);
    renderCharacterData();
}