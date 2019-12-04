const views = {
    drd: { selector: "#view-drd" },
    'dt-season': { selector: "#view-dt-season" },
    'dt-holiday': { selector: "#view-dt-holiday" },
    'dt-holiday-wrong': { selector: "#view-dt-holiday-wrong" },
    'drd-relations': { selector: "#view-drd-relations" },
    'drd-relations-correct-type': { selector: "#view-drd-relations-correct-type" },
    'drd-relations-new': { selector: "#view-drd-relations-new" }
}

let stateHoliday;
let stateRelations;

function switchView(viewId) {

    // make switched visible
    const newView = views[viewId];
    const node = $(newView.selector);
    node.css('visibility', 'visible');

    console.log(node);

    // make all others invisible
    Object.values(views).forEach(v => {
        if(v !== newView) {
            $(v.selector).css('visibility', 'hidden');
        }
    });
}

function toggleDRDHovers(val) {
    const node1 = $('.connection-outline-permanent');

    const node2 = $('.see-relations');

    const node3 = $('.inputs');

    const node4 = $('.outputs');


    node1.css('visibility', val);
    node2.css('visibility', val);
    node3.css('visibility', val);
    node4.css('visibility', val);
}

$(document).ready(function(){
    $('.to-dt-holiday').click(function() {
        if(stateHoliday === 'type-fixed') {
            switchView('dt-holiday')
        } else {
            switchView('dt-holiday-wrong')
        }
    });

    $('.change-type').click(function() {
        stateHoliday = 'type-fixed';
        stateRelations = 'correct-type';
        
        switchView('dt-holiday');
    });

    $('.to-dt-season').click(switchView.bind(this, 'dt-season'));
    $('.to-drd').click(switchView.bind(this, 'drd'));
    $('.to-relations-new').click(switchView.bind(this, 'drd-relations-new'));

    $('.see-relations').click(function() {
        toggleDRDHovers('hidden');

        if(stateRelations === 'correct-type') {
            switchView('drd-relations-correct-type');
        } else {
            switchView('drd-relations')
        }
    });

    $('#view-drd').click(function(e) {
        if (e.target !== this) {
            return;
        }

        toggleDRDHovers('hidden');
    });

    $('.connection').click(function() {
        toggleDRDHovers('visible');
    });

    // todo(pinussilvestrus): use toggle method instead
    $('.connection').mouseover(function() {
        const inputs = $('.inputs');
        const outputs = $('.outputs');
    
        inputs.css('visibility', 'visible');
        outputs.css('visibility', 'visible');
    });

    $('.connection').mouseleave(function() {
        const inputs = $('.inputs');
        const outputs = $('.outputs');
    
        inputs.css('visibility', 'hidden');
        outputs.css('visibility', 'hidden');
    });
});