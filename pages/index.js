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

  return (
    <div className="p-4 max-w-2xl mx-auto text-center">
      <img src="/BTJ.png" alt="BTJ Logo" className="w-48 mx-auto mb-2" />
      <h1 className="text-2xl font-bold mb-4">Ficha Contagem Estoque Ração</h1>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        <input type="date" name="data" value={formData.data} onChange={handleChange} className="border p-2 w-full" placeholder="Data" />
        <input type="time" name="hora" value={formData.hora} onChange={handleChange} className="border p-2 w-full" placeholder="Hora" />
        <input type="text" name="responsavel" placeholder="Nome do responsável" value={formData.responsavel} onChange={handleChange} className="border p-2 w-full" />
      </div>
      
      {["carretao1", "carretao2", "carretao3"].map((carretao, idx) => (
        <div key={carretao} className="mb-4">
          <h2 className="text-lg font-semibold">Carretão {idx + 1}</h2>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(carretao === "carretao2" ? 6 : 8)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <span className="w-6">{i + 1}</span>
                <input type="text" placeholder="Tipo" value={formData[carretao][i].racao} onChange={(e) => handleCarretaoChange(i, carretao, "racao", e.target.value)} className="border p-2 w-24" />
                <input type="number" placeholder="Kg" value={formData[carretao][i].kgs} onChange={(e) => handleCarretaoChange(i, carretao, "kgs", e.target.value)} className="border p-2 w-20" />
              </div>
            ))}
          </div>
        </div>
      ))}
      
      <textarea name="observacao" placeholder="Observações" value={formData.observacao} onChange={handleChange} className="border p-2 w-full mb-4" />
      
      <div className="flex justify-center space-x-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Exportar</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">Compartilhar</button>
      </div>
      
      <img src="/Peixe.png" alt="Peixe Logo" className="w-24 mx-auto mt-6" />
      <p className="text-gray-700 mt-2">Fortalecer pessoas, pescando o melhor para nossos clientes</p>
    </div>
  );
}
