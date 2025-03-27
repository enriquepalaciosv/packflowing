type SectionTitle =
  | "Paquetes recibidos"
  | "Paquetes en tránsito"
  | "Paquetes listos para recoger"
  | "Paquetes entregados";

const groupPackagesByStatus = (packages: any[]) => {
  const statusMapping: Record<string, SectionTitle> = {
    recibido: "Paquetes recibidos",
    en_transito: "Paquetes en tránsito",
    listo_para_retirar: "Paquetes listos para recoger",
    entregado: "Paquetes entregados",
  };

  // Crear estructura inicial
  const sections: { title: SectionTitle; data: any[] }[] = [
    { title: "Paquetes recibidos", data: [] },
    { title: "Paquetes en tránsito", data: [] },
    { title: "Paquetes listos para recoger", data: [] },
    { title: "Paquetes entregados", data: [] },
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
