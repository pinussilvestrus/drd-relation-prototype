const views = {
    drd: { selector: "#view-drd" },
    'dt-season': { selector: "#view-dt-season" },
    'dt-holiday': { selector: "#view-dt-holiday" },
    'drd-relations': { selector: "#view-drd-relations" },
    'drd-relations-new': { selector: "#view-drd-relations-new" }
}

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
    $('.to-dt-holiday').click(switchView.bind(this, 'dt-holiday'));
    $('.to-dt-season').click(switchView.bind(this, 'dt-season'));
    $('.to-drd').click(switchView.bind(this, 'drd'));
    $('.to-relations-new').click(switchView.bind(this, 'drd-relations-new'));

    $('.see-relations').click(function() {
        switchView('drd-relations');
        toggleDRDHovers('hidden');
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