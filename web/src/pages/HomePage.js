export default function HomePage() {
  const generateReport = () => {
    fetch("http://localhost:5001/ourstreets-app/europe-west1/generateReport")
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
    <div className="container mx-auto pt-10 text-center">
      <h1 className="font-bold text-xl">ברחובות שלנו - ניהול</h1>
      <button onClick={generateReport} className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        יצירת דוח
      </button>
    </div>
  );
}
