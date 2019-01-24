var getTranslation = (language: string): Translation => {
  switch (language) {
    case 'English':
      return english
    default:
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
  fourMoreCommands: '4 kommandon till',
  itsGettingCrowded: 'Det börjar bli trångt...',
  orchestrationPlatform: 'Orkestrerings-plattform',
  startedByGoogle: 'Startad av Google',
  scalability: 'Skalbarhet',
  reliability: 'Pålitlighet',
  structure: 'struktur',
  parts: 'delar',
  questions: 'Frågor?',
  conclusion: 'Slutsats',
  worksDocker: 'Hur fungerar Docker?'
}

const english: Translation = {
  commonDeploymentProblems: 'Common deployment-problems',
  complicatedInstall: 'Complex installation',
  manualSteps: 'Manual steps',
  fileCopy: 'File copying',
  whatIsDocker: 'What is Docker?',
  altToVm: 'Alternative to Virtual Machines',
  appVirt: 'App-virtualization',
  packaging: 'Packaging',
  lifeOutsideSandbox: 'Life outside the Sandbox',
  fourCommands: '4 commands',
  fourMoreCommands: '4 more commands',
  itsGettingCrowded: 'It\'s getting crowded...',
  orchestrationPlatform: 'Orchestration-platform',
  startedByGoogle: 'Started by Google',
  scalability: 'Scalability',
  reliability: 'Reliability',
  structure: 'structure',
  parts: 'parts',
  questions: 'Questions?',
  conclusion: 'Conclusion',
  worksDocker: 'How does Docker work?'
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
  itsGettingCrowded: string
  orchestrationPlatform: string
  startedByGoogle: string
  scalability: string
  reliability: string
  structure: string
  parts: string
  questions: string
  conclusion: string
  worksDocker: string
}
