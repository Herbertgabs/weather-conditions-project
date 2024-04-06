const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionInfos = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!input || !sectionInfos) return;

  const loc = input.value;

  if (loc.length < 3) {
    alert("O local precisa ter mais de três letras");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=5ab34832b2eff12ab07294a78239b045&lang=pt_br&units=metric`
    );

    const data = await response.json();

    const infos = {
      temp: Math.round(data.main.temp),
      local: data.name,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionInfos.innerHTML = `
  <div class="tempo-dados">
      <h2>${infos.local}</h2>

      <span>${infos.temp}</span>
  </div>
  <img src="${infos.icon}" alt="">
  `;
  } catch (error) {
    console.log("API ERROR", error);
  }
});
