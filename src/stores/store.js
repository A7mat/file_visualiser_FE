import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useStore = defineStore("store", () => {
  const fileNames = ref({});
  const fileReport = ref({})

  function getFileNames() {
    axios
      .get("http://127.0.0.1:8000/api/get-file-names")
      .then((response) => {
        fileNames.value = response.data;
        return fileNames.value;
      })
      .catch((err) => console.log(err));
  }

  // TODO continue with implementation. (pass the report to FilePreview.vue)
  function getFileById(fileId) {
	axios.get(`http://127.0.0.1:8000/api/get-file-names/${fileId}`)
	.then((response) => {
		fileReport.value = response.data;
	})
  }


  return { fileNames, getFileNames, fileReport, getFileById };
});
