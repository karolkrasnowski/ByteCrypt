<template>
  <v-stepper v-model="currentStep" vertical>
    <v-stepper-step :complete="currentStep > 1" step="1">
      Select what you want to do
    </v-stepper-step>

    <v-stepper-content step="1">
      <v-btn color="primary" @click="encryptionMode">Encrypt</v-btn>
      <v-btn text @click="decryptionMode">Decrypt</v-btn>
    </v-stepper-content>

    <v-form v-model="fileValid">
      <v-stepper-step :complete="currentStep > 2" step="2"
        >Choose a file</v-stepper-step
      >
      <v-stepper-content step="2">
        <v-file-input
          show-size
          v-if="mode === 'encryption'"
          accept="*/*"
          label="File input"
          :rules="[validationRules.required]"
          @change="selectFile"
        ></v-file-input>
        <v-file-input
          show-size
          v-if="mode === 'decryption'"
          accept=".enc"
          label="File input"
          :rules="[validationRules.required]"
          @change="selectFile"
        ></v-file-input>
        <v-btn color="primary" @click="currentStep = 3" :disabled="!fileValid"
          >Continue</v-btn
        >
        <span></span>
        <v-btn text @click="currentStep = 1">Cancel</v-btn>
      </v-stepper-content>
    </v-form>

    <v-form v-model="passwordValid">
      <v-stepper-step :complete="currentStep > 3" step="3">
        Enter a password
      </v-stepper-step>
      <v-stepper-content step="3">
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[validationRules.required, validationRules.minLength]"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-1"
          label="Password"
          counter
          @click:append="showPassword = !showPassword"
        ></v-text-field>
        <v-btn
          color="primary"
          @click="encryptOrDecryptSelectedFile"
          :disabled="!passwordValid"
        >
          Continue
        </v-btn>
        <v-btn text @click="currentStep = 2">Cancel</v-btn>
      </v-stepper-content>
    </v-form>

    <v-stepper-step step="4">Download file</v-stepper-step>
    <v-stepper-content step="4">
      <v-btn color="primary" @click="downloadFile">Download file</v-btn>
      <v-btn text @click="currentStep = 3">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>
</template>

<script>
import { encrypt, decrypt } from '@/services/encryptionService.js'

export default {
  name: 'Stepper',

  data() {
    return {
      mode: '',
      currentStep: 1,
      password: '',
      selectedFile: undefined,
      encryptedFile: undefined,
      decryptedFile: undefined,
      fileValid: false,
      passwordValid: false,
      showPassword: false,
      validationRules: {
        required: (value) => !!value || 'Required',
        minLength: (v) => v.length >= 8 || 'Min 8 characters',
      },
    }
  },
  methods: {
    encryptionMode() {
      this.mode = 'encryption'
      this.currentStep = 2
    },
    decryptionMode() {
      this.mode = 'decryption'
      this.currentStep = 2
    },
    selectFile(file) {
      this.selectedFile = file
    },
    async encryptOrDecryptSelectedFile() {
      if (this.mode === 'encryption') {
        this.encryptedFile = await encrypt(this.selectedFile, this.password)
      }
      if (this.mode === 'decryption') {
        this.decryptedFile = await decrypt(this.selectedFile, this.password)
      }
      this.currentStep = 4
    },
    downloadFile() {
      const url = window.URL.createObjectURL(new Blob([this.fileToDownload()]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', this.newFilename())
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      this.resetState()
    },
    resetState() {
      this.mode = ''
      this.currentStep = 1
      this.password = ''
      this.selectedFile = undefined
      this.encryptedFile = undefined
      this.decryptedFile = undefined
    },
    fileToDownload() {
      if (this.mode === 'encryption') {
        return this.encryptedFile
      }
      if (this.mode === 'decryption') {
        return this.decryptedFile
      }
    },
    newFilename() {
      if (this.mode === 'encryption') {
        return `${this.selectedFile.name}.enc`
      }
      if (this.mode === 'decryption') {
        return this.selectedFile.name.replace('.enc', '')
      }
    },
  },
}
</script>