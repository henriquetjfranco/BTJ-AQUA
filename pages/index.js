import { useState } from "react";
import html2canvas from "html2canvas";

export default function FichaApp() {
  const [formData, setFormData] = useState({
    data: "",
    hora: "",
    responsavel: "",
    carretao1: Array(8).fill({ racao: "", kgs: "" }),
    carretao2: Array(6).fill({ racao: "", kgs: "" }),
    carretao3: Array(8).fill({ racao: "", kgs: "" }),
    observacao: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCarretaoChange = (index, carretao, field, value) => {
    const updatedCarretao = [...formData[carretao]];
    updatedCarretao[index] = { ...updatedCarretao[index], [field]: value };
    setFormData({ ...formData, [carretao]: updatedCarretao });
  };

  const handleExport = async () => {
    const ficha = document.getElementById("ficha-preview");
    const canvas = await html2canvas(ficha);
    const image = canvas.toDataURL("image/png");
    
    const link = document.createElement("a");
    link.href = image;
    link.download = "ficha.png";
    link.click();
  };

  return (
    <div className="p-4 max-w-lg mx-auto text-center">
      <img src="/BTJ.png" alt="BTJ Logo" className="mx-auto w-32 mb-4" />
      <h1 className="text-xl font-bold mb-4">Ficha Contagem Estoque Ração</h1>
      
      <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Data" />
      <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Hora" />
      <input type="text" name="responsavel" placeholder="Nome do responsável" value={formData.responsavel} onChange={handleChange} className="border p-2 w-full mb-4" />
      
      {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
        <div key={carretao} className="mb-4 text-left">
          <h2 className="text-lg font-semibold">Carretão {idx + 1}</h2>
          {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <span className="w-8 text-center">{i + 1}</span>
              <input type="text" placeholder="Tipo" value={formData[carretao][i].racao} onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)} className="border p-2 w-24" />
              <input type="number" placeholder="Kg" value={formData[carretao][i].kgs} onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)} className="border p-2 w-24" />
            </div>
          ))}
        </div>
      ))}
      
      <textarea name="observacao" placeholder="Observações" value={formData.observacao} onChange={handleChange} className="border p-2 w-full mb-4" />
      
      <div id="ficha-preview" className="p-4 border bg-gray-100">
        <p><strong>Data:</strong> {formData.data}</p>
        <p><strong>Hora:</strong> {formData.hora}</p>
        <p><strong>Responsável:</strong> {formData.responsavel}</p>
        {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
          <div key={carretao}>
            <h3 className="text-lg font-semibold">Carretão {idx + 1}</h3>
            <table className="border w-full mb-2">
              <thead>
                <tr>
                  <th className="border p-2">Cx</th>
                  <th className="border p-2">Ração</th>
                  <th className="border p-2">Kgs</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
                  <tr key={i}>
                    <td className="border p-2 text-center">{i + 1}</td>
                    <td className="border p-2">{formData[carretao][i].racao}</td>
                    <td className="border p-2">{formData[carretao][i].kgs}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <p><strong>Observações:</strong> {formData.observacao}</p>
      </div>
      
      <button onClick={handleExport} className="mt-4 w-full bg-blue-500 text-white p-2 rounded">Exportar como Imagem</button>
      <img src="/Peixe.png" alt="Peixe BTJ" className="mx-auto w-32 mt-4" />
      <p className="text-sm mt-2">Fortalecer pessoas, pescando o melhor para nossos clientes</p>
    </div>
  );
}
