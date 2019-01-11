export enum Language {
  Swedish,
  English
}

var getTranslation = (language: Language): Translation => {
  switch (language) {
    case Language.Swedish:
      return swedish
  }
}

export { getTranslation }

const swedish: Translation = {
  commonDeploymentProblems: 'Vanliga deployment-problem',
  complicatedInstall: 'Komplicerat att installera',
  manualSteps: 'Manuella steg',
  fileCopy: 'Filkopiering',
  whatIsDocker: 'Vad är Docker?',
  altToVm: 'Alternativ till Virtual Machine',
  appVirt: 'App-virtualisering',
  packaging: 'Paketering',
  lifeOutsideSandbox: 'Livet utanför Sandboxen',
  fourCommands: '4 kommandon',
  fourMoreCommands: '4 kommandon till'
}

export interface Translation {
  commonDeploymentProblems: string
  complicatedInstall: string
  manualSteps: string
  fileCopy: string
  whatIsDocker: string
  altToVm: string
  appVirt: string
  packaging: string
  lifeOutsideSandbox: string
  fourCommands: string
  fourMoreCommands: string
}
