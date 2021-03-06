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
      img: "https://timebeings.github.io/img/wood.png"
      // description:
      // // "Robots have to work a little less hard on wooden"
      //   // "Less suction is required to clean wooden floors which means that the vacuums can be cheaper."
    },
    {
      type: "Carpet",
      selected: false,
      img: "https://timebeings.github.io/img/carpet.png"
      // description:
      //   "With more surface area for dust to hide, carpets require a more powerful vacuum"
    },
    {
      type: "Carpet and Wood",
      selected: false,
      img: "https://timebeings.github.io/img/mix-floor.png"
      //   "e.g. Wooden floors with rugs or some rooms carpeted and others not"
    },
    {
      type: "Other",
      selected: false,
      img: "https://timebeings.github.io/img/other.png"
      // description: "e.g. Tiles, Laments or concrete flooring"
    }
  ]);

  const [hasStairs, setHasStairs] = window.React.useState(false);
  const [hasPets, setHasPets] = window.React.useState(false);

  const [numberOfBedrooms, setNumberOfBedrooms] = window.React.useState([
    { number: 1, selected: false },
    { number: 2, selected: true },
    { number: 3, selected: false },
    { number: "4+", selected: false }
  ]);

  const [showResult, setShowResult] = window.React.useState(false);
  const [result, setResult] = window.React.useState({});

  const robotVacuums = [
    {
      name: "Eufy RoboVac 11",
      description: "Perfect for hard floors and thin carpets.",
      img: "https://timebeings.github.io/img/robot/eufy-robovac-11.png",
      features:
        "Remote controlled, Simple to maintain and at 7.8cm in height it can go under most furniture.",
      price: "10"
    },
    {
      name: "Neato Botvac Connected D6",
      description: "",
      img: "https://timebeings.github.io/img/robot/neato-botvac-d6.png",
      features:
        "Designed for homes with pets, smart navigation that creates floor plans, smartphone app to schedule cleaning.",
      price: "25"
    },
    {
      name: "Dyson 360 Eye",
      description: "",
      img: "https://timebeings.github.io/img/robot/dyson-360-eye.png",
      features: "Features: 1, 2, 3",
      price: "35"
    },
    {
      name: "Eufy RoboVac 30C",
      description: "",
      img: "https://timebeings.github.io/img/robot/eufy-robovac-30.png",
      features: "Features: 1, 2, 3",
      price: "12"
    }
  ];

  const handheldVacuums = [
    {
      name: "Dyson v8 Animal",
      img: "https://timebeings.github.io/img/handheld/dyson-v8-animal.png",
      description: "Lightweight handheld vacuum",
      price: "15"
    },
    {
      name: "Dyson v7 Trigger",
      img: "https://timebeings.github.io/img/handheld/dyson-v7-trigger.png",
      description: "Lightweight handheld vacuum",
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
    window.scroll(0, window.scrollY + 300);
  };

  return html`
    <ul
      class=${!showVacuum && !showOther
        ? "nav nav-tabs nav-tabs-close"
        : "nav nav-tabs"}
    >
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
          >Other</span
        >
      </li>
    </ul>

    ${showVacuum &&
      html`
        <div class="calculator">
          <p class="intro">
            To help us recommend the right robot for you please fill out these
            four quick questions.
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
                    setShowResult(false);
                  }}
                >
                  <img src=${floor.img} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">${floor.type}</h5>
                  </div>
                </div>
              `;
            })}
          </div>

          <h3>Are there stairs in your property?</h3>
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
                  setShowResult(false);
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
                  setShowResult(false);
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
                  setShowResult(false);
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
                  setShowResult(false);
                }}
              />
              No
            </label>
          </div>

          <h3>How many bedrooms does your property have?</h3>

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
                      setShowResult(false);
                    }}
                  />
                  ${bed.number}
                </label>
              `;
            })}
          </div>

          <div class="submit">
            <button
              type="button"
              class="btn btn-primary btn-lg"
              onClick=${() => {
                generateResult();
                setShowResult(true);
              }}
            >
              Find a robot
            </button>
          </div>
          ${showResult &&
            html`
              <div>
                <div class="recommend">
                  <p>
                    We recommend the <strong>${result.name}</strong> robot
                    vacuum cleaner.
                  </p>
                  ${result.handheld &&
                    html`
                      <p>
                        You have told us that your property has stairs.
                        Unfortunately robot vacuum cleaners cannot clean the
                        stairs yet.
                      </p>
                      <p>
                        Therefore we also recommend
                        <strong> ${result.handheld.name}</strong>, a lightweight
                        handheld vacuum cleaner, which will make vacuuming the
                        stairs quick and easy.
                      </p>
                    `}
                </div>

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
                            <p class="card-text">
                              <strong>Features: </strong>${result.features}
                            </p>
                            <p class="card-text">
                              Available now for
                              <strong> £${result.price}</strong> a month through
                              our subscription service.
                            </p>
                            <button
                              type="button"
                              class="btn btn-primary btn-lg"
                              onClick=${() => {
                                document.getElementById(
                                  "form01-message"
                                ).value =
                                  "Hi Time Beings, I am interested in starting a subscription for the " +
                                  result.name +
                                  " robot vacuum cleaner.";

                                window.location.href = "#" + "form01";
                              }}
                            >
                              Get started
                            </button>
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
                                class="card-img handheld-img"
                                alt="..."
                              />
                            </div>
                            <div class="col-md-8">
                              <div class="card-body">
                                <h5 class="card-title">
                                  ${result.handheld.name}
                                </h5>
                                <p class="card-text">
                                  ${result.handheld.description}
                                </p>
                                <p class="card-text">
                                  Available now for
                                  <strong> £${result.handheld.price}</strong> a
                                  month through our subscription service.
                                </p>
                              </div>
                            </div>

                            <button
                              type="button"
                              class="btn btn-primary btn-lg btn-handheld"
                              onClick=${() => {
                                document.getElementById(
                                  "form01-message"
                                ).value =
                                  "Hi Time Beings, I am interested in starting a subscription for the " +
                                  result.name +
                                  " robot vacuum cleaner and the " +
                                  result.handheld.name +
                                  "handheld vacuum.";

                                window.location.href = "#" + "form01";
                              }}
                            >
                              Add to your subscription
                            </button>
                          </div>
                        </div>
                      </div>
                    `}
                </div>
              </div>
            `}
        </div>
      `}
    ${showOther &&
      html`
        <div class="calculator">
          <p>
            We are currently working hard to bring you recommendations for other
            types of robots.
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
