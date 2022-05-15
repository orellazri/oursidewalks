export default function HomePage() {
  const generateReport = () => {
    fetch("https://europe-west1-ourstreets-app.cloudfunctions.net/generateReport")
      .then((response) => {
        response.text().then((text) => {
          require("downloadjs")(text, "report.csv", "text/csv");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container pt-10 mx-auto text-center">
      <h1 className="text-xl font-bold">ברחובות שלנו - ניהול</h1>
      <button onClick={generateReport} className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        יצירת דוח
      </button>
    </div>
  );
}
