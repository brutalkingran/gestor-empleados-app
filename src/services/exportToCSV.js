export const exportToCSV = ( employees ) => {
    const headers = [
      "firstName",
      "lastName",
      "email",
      "phoneNumber",
      "position",
      "rank",
      "department",
      "hireDate",
      "isActive",
      "salary",
      "birthday",
      "sex",
      "stressLevel",
      "photo",
      "notes"
    ];

    const csvContent = [
      headers.join(","), // cabeceras
      ...employees.map(emp =>
        headers.map(h => JSON.stringify(emp[h] ?? "")).join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "employees.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };