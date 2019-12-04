const views = {
    drd: { selector: "#view-drd" },
    'dt-season': { selector: "#view-dt-season" },
    'dt-season-complete': { selector: "#view-dt-season-complete" },
    'dt-holiday-wrong': { selector: "#view-dt-holiday-wrong" },
    'dt-holiday': { selector: "#view-dt-holiday" },
    'dt-holiday-summerdays': { selector: "#view-dt-holiday-summerdays" },
    'dt-holiday-complete': { selector: "#view-dt-holiday-complete" },
    'drd-relations': { selector: "#view-drd-relations" },
    'drd-relations-correct-type': { selector: "#view-drd-relations-correct-type" },
    'drd-relations-correct-variable': { selector: "#view-drd-relations-correct-variable" },
    'drd-relations-new': { selector: "#view-drd-relations-new" },
    'drd-relations-new-filled': { selector: "#view-drd-relations-new-filled" },
    'drd-relations-complete': { selector: "#view-drd-relations-complete" }
}

let state;

function switchView(viewId) {

    // make switched visible
    const newView = views[viewId];
    const node = $(newView.selector);
    node.css('visibility', 'visible');

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
        toggleDRDHovers('hidden');

        switch(state) {
            case 'correct-type': switchView('dt-holiday'); break;
            case 'correct-variable': switchView('dt-holiday-summerdays'); break;
            case 'complete': switchView('dt-holiday-complete'); break;
            default: switchView('dt-holiday-wrong'); break;
        }
    });

    $('.change-type').click(function() {
        state = 'correct-type';
        switchView('dt-holiday');
    });

    $('.fix-variable').click(function() {
        state = 'correct-variable';
        switchView('drd-relations-correct-variable');
    });

    $('.to-dt-season').click(function() {
        toggleDRDHovers('hidden');

        switch(state) {
            case 'complete': switchView('dt-season-complete'); break;
            default: switchView('dt-season'); break;
        }
    });


    $('.to-drd').click(switchView.bind(this, 'drd'));
    $('.to-relations-new').click(switchView.bind(this, 'drd-relations-new'));
    $('.to-relations-new-filled').click(switchView.bind(this, 'drd-relations-new-filled'));

    $('.to-relations-complete').click(function()  {
        state = 'complete';
        switchView('drd-relations-complete');
    });

    $('.to-relations').click(function() {
        toggleDRDHovers('hidden');

        switch(state) {
            case 'correct-type': switchView('drd-relations-correct-type'); break;
            case 'correct-variable': switchView('drd-relations-correct-variable'); break;
            case 'complete': switchView('drd-relations-complete'); break;
            default: switchView('drd-relations'); break;
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