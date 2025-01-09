const supabase = require("../lib/supabase");

const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

exports.addProject = async (req, res) => {
  const insertData = ({
    Client_Name,
    OrderID,
    Address,
    ProjectID,
    Delivery_Status,
    Payment_Status,
    Project_Payment,
    Photos,
    Videos,
    External_Media,
    Property_Website,
  } = req.body);

  try {
    // const userID = req.user.id;
    // const role = await getUserRole(userID);

    // if (role !== "admin")
    //   return res.status(403).json({ error: "Unauthorized" });

    const { data, error } = await supabase
      .from("Media_Projects")
      .insert([insertData])
      .select();

    console.log("data", data);
    if (data) {
      res
        .status(201)
        .json({ message: "Project added successfully", data: data });
    } else {
      res.status({ message: "data is null" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await fromSupabase(
      supabase.from("Media_Projects").select("*")
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
