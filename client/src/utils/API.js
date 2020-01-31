import axios from "axios";

export default {
  // Gets all Journals
  getJournals: function() {
    return axios.get("/api/Journals");
  },
  // Gets the Journal with the given id
  getJournal: function(id) {
    return axios.get("/api/Journals/" + id);
  },
  // Deletes the Journal with the given id
  deleteJournal: function(id) {
    return axios.delete("/api/Journals/" + id);
  },
  // Saves a Journal to the database
  saveJournal: function(JournalData) {
    return axios.post("/api/Journals", JournalData);
  }
};
