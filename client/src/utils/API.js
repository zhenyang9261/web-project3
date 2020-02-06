import axios from "axios";

export default {
  // Gets all Journals
  getJournals: function() {
    return axios.get("/api/journals");
  },
  // Gets the Journal with the given id
  getJournal: function(id) {
    return axios.get("/api/journals/" + id);
  },
  // Deletes the Journal with the given id
  deleteJournal: function(id) {
    return axios.delete("/api/journals/" + id);
  },
  // Saves a Journal to the database
  saveJournal: function(JournalData) {
    return axios.post("/api/journals", JournalData);
  },
  getJournalCountry: function(country) {
    return axios.get("/api/journals/country/" + country);
  },
  getJournalRating: function(rating) {
    return axios.get("/api/journals/rating/" + rating);
  }
};
