const views = {
  drd: { selector: "#view-drd" },
  "dt-season": { selector: "#view-dt-season" },
  "dt-season-complete": { selector: "#view-dt-season-complete" },
  "dt-holiday-wrong": { selector: "#view-dt-holiday-wrong" },
  "dt-holiday": { selector: "#view-dt-holiday" },
  "dt-holiday-summerdays": { selector: "#view-dt-holiday-summerdays" },
  "dt-holiday-complete": { selector: "#view-dt-holiday-complete" },
  "drd-relations": { selector: "#view-drd-relations" },
  "drd-relations-correct-type": {
    selector: "#view-drd-relations-correct-type"
  },
  "drd-relations-correct-variable": {
    selector: "#view-drd-relations-correct-variable"
  },
  "drd-relations-new": { selector: "#view-drd-relations-new" },
  "drd-relations-new-filled": { selector: "#view-drd-relations-new-filled" },
  "drd-relations-complete": { selector: "#view-drd-relations-complete" }
};

let viewState;
let hoverState;

function getInputOutputForState(state) {
  switch (state) {
    case "correct-type":
      return {
        outputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" }
        ],
        inputs: [
          { name: "Season", type: "string" },
          { name: "Days", type: "integer" }
        ]
      };
    case "correct-variable":
      return {
        outputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" }
        ],
        inputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" }
        ]
      };
    case "complete":
      return {
        outputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" },
          { name: "myHoliday", type: "date" }
        ],
        inputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" },
          { name: "myHoliday", type: "date" }
        ]
      };
    default:
      return {
        outputs: [
          { name: "Season", type: "string" },
          { name: "Summerdays", type: "integer" }
        ],
        inputs: [
          { name: "Season", type: "boolean" },
          { name: "Days", type: "integer" }
        ]
      };
  }
}

function switchView(viewId) {
  // make switched visible
  const newView = views[viewId];
  const node = $(newView.selector);
  node.css("visibility", "visible");

  // make all others invisible
  Object.values(views).forEach(v => {
    if (v !== newView) {
      $(v.selector).css("visibility", "hidden");
    }
  });
}

function toggleHovers(nodes, val) {
  nodes.forEach(n => $(n).css("visibility", val));
}

function emptyHover() {
  const inputs = $(".inputs");
  const outputs = $(".outputs");

  inputs.empty();
  outputs.empty();

  toggleHovers(
    [
      ".context-pad",
      ".connection-outline",
      ".click-hint",
      ".inputs",
      ".outputs"
    ],
    "hidden"
  );

  hoverState = "unfocused";
}

function renderHover() {
  toggleHovers([".connection-outline", ".inputs", ".outputs"], "visible");
}

$(document).ready(function() {
  $(".to-dt-holiday").click(function() {
    emptyHover();

    switch (viewState) {
      case "correct-type":
        switchView("dt-holiday");
        break;
      case "correct-variable":
        switchView("dt-holiday-summerdays");
        break;
      case "complete":
        switchView("dt-holiday-complete");
        break;
      default:
        switchView("dt-holiday-wrong");
        break;
    }
  });

  $(".change-type").click(function() {
    viewState = "correct-type";
    switchView("dt-holiday");
  });

  $(".fix-variable").click(function() {
    viewState = "correct-variable";
    switchView("drd-relations-correct-variable");
  });

  $(".to-dt-season").click(function() {
    emptyHover();

    switch (viewState) {
      case "complete":
        switchView("dt-season-complete");
        break;
      default:
        switchView("dt-season");
        break;
    }
  });

  $(".to-drd").click(switchView.bind(this, "drd"));
  $(".to-relations-new").click(switchView.bind(this, "drd-relations-new"));
  $(".to-relations-new-filled").click(
    switchView.bind(this, "drd-relations-new-filled")
  );

  $(".to-relations-complete").click(function() {
    viewState = "complete";
    switchView("drd-relations-complete");
  });

  $(".to-relations").click(function() {
    emptyHover();

    switch (viewState) {
      case "correct-type":
        switchView("drd-relations-correct-type");
        break;
      case "correct-variable":
        switchView("drd-relations-correct-variable");
        break;
      case "complete":
        switchView("drd-relations-complete");
        break;
      default:
        switchView("drd-relations");
        break;
    }
  });

  $("#view-drd").click(function(e) {
    if (e.target !== this) {
      return;
    }

    emptyHover();
  });

  $(".connection").click(function() {
    renderHover();
    toggleHovers([".context-pad"], "visible");
    hoverState = "focused";
  });

  $(".connection").mouseover(function() {
    if (hoverState === "focused") {
      return;
    }

    const values = getInputOutputForState(viewState);

    const inputs = $(".inputs");
    const outputs = $(".outputs");

    outputs.append("<b>Output Variables</b><br/>");
    inputs.append("<b>Input Variables</b><br/>");

    values.outputs.forEach(o => {
      outputs.append(`<span>${o.name}: ${o.type}</span><br />`);
    });

    values.inputs.forEach(i => {
      inputs.append(`<span>${i.name}: ${i.type}</span><br />`);
    });

    // sets top automatically by size of values
    outputs.css('top', `${405 - (values.outputs.length + 1) * 13}px`);

    renderHover();
  });

  $(".connection").mouseleave(function() {
    if (hoverState === "focused") {
      return;
    }

    emptyHover();
  });

  $(".fa-plug").tooltip({
    show: {
      effect: "none",
      delay: 250
    },
    position: {
      using: function(position) {
        $(this).css(position);
        $(this).css("box-shadow", "none")
      }
    }
  });
});
