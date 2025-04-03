import { SectionTitle, statusMapping } from "./mappingText";

const groupPackagesByStatus = (packages: any[]) => {
  // Crear estructura inicial
  const sections: { title: SectionTitle; data: any[]; path: string }[] = [
    { title: "Paquetes recibidos", data: [], path: "recibido" },
    { title: "Paquetes en tránsito", data: [], path: "recibido" },
    {
      title: "Paquetes listos para recoger",
      data: [],
      path: "listo_para_retirar",
    },
    { title: "Paquetes entregados", data: [], path: "entregado" },
  ];

  packages.forEach((pkg) => {
    const lastStatus =
      pkg.rastreo?.[pkg.rastreo.length - 1]?.estado || "recibido";
    const sectionTitle = statusMapping[lastStatus] || "Paquetes recibidos";

    // Buscar la sección correspondiente y agregar el paquete
    const section = sections.find((s) => s.title === sectionTitle);
    if (section) {
      section.data.push(pkg);
    }
  });

  return sections;
};

export default groupPackagesByStatus;
