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

exports.updateProject = async (req, res) => {
  const { ProjectID } = req.params;
  const updatedData = ({
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
    const { data: existingProject, error: selectError } = await supabase
      .from("Media_Projects")
      .select("*")
      .eq("ProjectID", ProjectID)
      .single();

    if (selectError || !existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    const { data, error } = await supabase
      .from("Media_Projects")
      .update(updatedData)
      .eq("ProjectID", ProjectID)
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      message: "Project updated successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  const { ProjectID } = req.params;

  try {
    const { data: existingProject, error: selectError } = await supabase
      .from("Media_Projects")
      .select("*")
      .eq("ProjectID", ProjectID)
      .single();

    if (selectError || !existingProject) {
      return res.status(404).json({ error: "Project not found" });
    }

    const { data, error } = await supabase
      .from("Media_Projects")
      .delete()
      .eq("ProjectID", ProjectID);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({
      message: "Project deleted successfully",
      data: existingProject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
