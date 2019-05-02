// import Logo from "../../components/logo.js";
// const styles = css`/routes/home/index.css`;

export default () => {
  // Declare a new state variable, which we'll call "count"
  const [showVacuum, setShowVacuum] = window.React.useState(true);
  const [showOther, setShowOther] = window.React.useState(false);

  const [floorTypes, setSelectedFloorTypes] = window.React.useState([
    {
      type: "Wood",
      selected: true,
      img: "https://timebeings.github.io/img/wood.png",
      description:
        "Less suction is required to clean wooden floors which means that the vacuums can be cheaper."
    },
    {
      type: "Carpet",
      selected: false,
      img: "https://timebeings.github.io/img/carpet.png",
      description:
        "With more surface area for dust to hide, carpets require a more powerful vacuum"
    },
    {
      type: "Mixture",
      selected: false,
      img: "https://timebeings.github.io/img/mix-floor.png",
      description:
        "e.g. Wooden floors with rugs or some rooms carpeted and others not"
    },
    {
      type: "Other",
      selected: false,
      img: "https://timebeings.github.io/img/other.png",
      description: "e.g. Tiles, Laments or concrete flooring"
    }
  ]);

  const [hasStairs, setHasStairs] = window.React.useState(false);
  const [hasPets, setHasPets] = window.React.useState(false);

  const [numberOfBedrooms, setNumberOfBedrooms] = window.React.useState([
    { number: 1, selected: false },
    { number: 2, selected: false },
    { number: 3, selected: false },
    { number: "4+", selected: false }
  ]);

  const [showResult, setShowResult] = window.React.useState(false);
  const [result, setResult] = window.React.useState({});

  const robotVacuums = [
    {
      name: "Eufy RoboVac 11",
      description: "Perfect for hardfloors and thin carpets.",
      img: "./img/robot/eufy-robovac-11.png",
      description: "Perfect for hardfloors and thin carpets.",
      features: "Features: 1, 2, 3",
      price: "10"
    },
    {
      name: "Neato Botvac Connected D6",
      description: "",
      img: "",
      description: "",
      features: "Features: 1, 2, 3",
      price: "25"
    },
    {
      name: "Dyson 360 Eye",
      description: "",
      img: "",
      description: "",
      features: "Features: 1, 2, 3",
      price: "35"
    },
    {
      name: "Eufy RoboVac 30C",
      description: "",
      img: "",
      description: "",
      features: "Features: 1, 2, 3",
      price: "12"
    }
  ];

  const handheldVacuums = [
    {
      name: "Dyson v8 Animal",
      description: "",
      img: "",
      description: "",
      features: "Features: 1, 2, 3",
      price: "15"
    },
    {
      name: "Dyson v7 Trigger",
      description: "",
      img: "",
      description: "",
      features: "Features: 1, 2, 3",
      price: "10"
    }
  ];

  const generateResult = () => {
    const selectedFloorType = floorTypes.find(floor => floor.selected).type;
    const selectedNumberOfBedrooms = numberOfBedrooms.find(
      beds => beds.selected
    ).number;

    console.log(selectedFloorType);
    console.log(selectedNumberOfBedrooms);
    let robotRecommendation;
    if (selectedFloorType === "Wood") {
      if (
        (selectedNumberOfBedrooms === 2 || selectedNumberOfBedrooms === 3) &&
        hasPets
      ) {
        robotRecommendation = 1;
      } else if (selectedNumberOfBedrooms === "4+") {
        robotRecommendation = 2;
      } else {
        robotRecommendation = 0;
      }
    } else {
      if (selectedNumberOfBedrooms === 3 && hasPets) {
        robotRecommendation = 1;
      } else if (selectedNumberOfBedrooms === "4+") {
        robotRecommendation = 2;
      } else {
        robotRecommendation = 3;
      }
    }
    setResult({
      ...robotVacuums[robotRecommendation],
      ...(hasStairs ? { handheld: handheldVacuums[hasPets ? 0 : 1] } : {})
    });
  };

  return html`
    <ul class="nav nav-tabs">
      <li class="nav-item">
        <span
          class=${showVacuum ? "nav-link active" : "nav-link"}
          onClick=${() => {
            setShowVacuum(true);
            setShowOther(false);
          }}
          >Vacuum</span
        >
      </li>
      <li class="nav-item">
        <span
          class=${showOther ? "nav-link active" : "nav-link"}
          onClick=${() => {
            setShowVacuum(false);
            setShowOther(true);
          }}
          >Other Robots</span
        >
      </li>
    </ul>

    ${showVacuum &&
      html`
        <div class="container">
          <p class="intro">
            Fill out four quick questions about your home and we will suggest
            the best robot for you.
          </p>
          <h3>What type of flooring do you have in your property?</h3>

          <div class="card-deck">
            ${floorTypes.map(floor => {
              return html`
                <div
                  class=${floor.selected
                    ? "card bg-primary text-white"
                    : "card"}
                  onClick=${() => {
                    const newFloorTypes = floorTypes.map(newFloor => {
                      return {
                        ...newFloor,
                        selected: newFloor.type === floor.type
                      };
                    });

                    setSelectedFloorTypes(newFloorTypes);
                  }}
                >
                  <img src=${floor.img} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">${floor.type}</h5>
                    <p class="card-text">
                      ${floor.description}
                    </p>
                  </div>
                </div>
              `;
            })}
          </div>

          <h3>Does your property have stairs?</h3>
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              class=${hasStairs
                ? "btn btn-primary btn-lg"
                : "btn btn-light btn-lg"}
            >
              <input
                type="radio"
                name="hasStairs"
                id="hasStairs1"
                autocomplete="off"
                checked=${hasStairs}
                onClick=${() => {
                  setHasStairs(true);
                }}
              />
              Yes
            </label>
            <label
              class=${!hasStairs
                ? "btn btn-primary btn-lg"
                : "btn btn-light btn-lg"}
            >
              <input
                type="radio"
                name="hasStairs"
                id="hasStairs2"
                autocomplete="off"
                checked=${!hasStairs}
                onClick=${() => {
                  setHasStairs(false);
                }}
              />
              No
            </label>
          </div>

          <h3>Do you have a dog or cat?</h3>

          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            <label
              class=${hasPets
                ? "btn btn-primary btn-lg"
                : "btn btn-light btn-lg"}
            >
              <input
                type="radio"
                name="options"
                id="option1"
                autocomplete="off"
                checked=${hasPets}
                onClick=${() => {
                  setHasPets(true);
                }}
              />
              Yes
            </label>
            <label
              class=${hasPets
                ? "btn btn-light btn-lg"
                : "btn btn-primary btn-lg"}
            >
              <input
                type="radio"
                name="options"
                id="option2"
                autocomplete="off"
                checked=${!hasPets}
                onClick=${() => {
                  setHasPets(false);
                }}
              />
              No
            </label>
          </div>

          <h3>How many bedrooms does your home have?</h3>

          <div class="btn-group btn-group-toggle" data-toggle="buttons">
            ${numberOfBedrooms.map(bed => {
              return html`
                <label
                  class=${bed.selected
                    ? "btn btn-primary btn-lg"
                    : "btn btn-light btn-lg"}
                >
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autocomplete="off"
                    checked=${numberOfBedrooms}
                    onClick=${() => {
                      const newNumberOfBeds = numberOfBedrooms.map(newBeds => {
                        return {
                          ...newBeds,
                          selected: newBeds.number === bed.number
                        };
                      });

                      setNumberOfBedrooms(newNumberOfBeds);
                    }}
                  />
                  ${bed.number}
                </label>
              `;
            })}
          </div>

          <div>
            <p>
              Click here to see our recommended robot
            </p>
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick=${() => {
                generateResult();
                setShowResult(true);
              }}
            >
              Recommend
            </button>
          </div>
          ${showResult &&
            html`
              <div class="row">
                <div class="col-sm-8">
                  <div class="card mb-3">
                    <div class="row no-gutters">
                      <div class="col-md-4">
                        <img src=${result.img} class="card-img" alt="..." />
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${result.name}</h5>
                          <p class="card-text">
                            ${result.description}
                          </p>
                          <p class="card-text">${result.features}</p>
                          <p class="card-text">
                            Avaialble now for £${result.price} a month through
                            our subscription service.
                          </p>
                          <button
                            type="button"
                            class="btn btn-primary btn-lg"
                            onClick=${() => {
                              document.getElementById("form01-message").value =
                                "please hook me up with one of your robots";

                              window.location.href = "#" + "form01";
                            }}
                          >
                            order now
                          </button>
                          <p class="card-text">
                            <small class="text-muted"
                              >Last updated 3 mins ago</small
                            >
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                ${result.handheld &&
                  html`
                    <div class="col-sm-4">
                      <div class="card mb-3">
                        <div class="row no-gutters">
                          <div class="col-md-4">
                            <img
                              src=${result.handheld.img}
                              class="card-img"
                              alt="..."
                            />
                          </div>
                          <div class="col-md-8">
                            <div class="card-body">
                              <h5 class="card-title">
                                ${result.handheld.name}
                              </h5>
                              <p class="card-text">
                                ${result.description}
                              </p>
                              <p class="card-text">
                                ${result.handheld.features}
                              </p>
                              <p class="card-text">
                                Avaialble now for £${result.handheld.price} a
                                month through our subscription service.
                              </p>
                              <p class="card-text">
                                <small class="text-muted"
                                  >Last updated 3 mins ago</small
                                >
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  `}
              </div>
            `}
        </div>
      `}
    ${showOther &&
      html`
        <div class="container">
          <p>
            We are working hard to be able to recommend other types of robots.
          </p>
          <p>
            If you are interested in lawn mowing, mopping or window cleaning
            robots (or any other type of robot for that matter) then please send
            us a message using the form below.
          </p>
        </div>
      `}
  `;
};
