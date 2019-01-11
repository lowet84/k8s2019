import { SshBatch } from './SshBatch'
import { settings } from 'cluster'

var writeFileCommand = (filename: string, content: string): string => {
  var index = 0
  var lines = content
    .split(/\r?\n/)
    .filter(d => d.trim().length > 0)
    .map(d => `echo "${d}" ${index++ === 0 ? '>' : '>>'} ${filename}`)
  return lines.join('\n')
}

var batches: (
  settings: Settings
) => { [name: string]: SshBatch } = settings => {
  return {
    dockerBuild: new SshBatch(
      {
        dockerfile: `
  FROM arm32v7/node:10-slim
  RUN mkdir /app
  ADD index.js /app/index.js
  CMD node /app/index.js
  `,
        indexjs: `console.log('Running demo-application on host: ' + require('fs').readFileSync('/etc/hostname','utf8'))`
      },
      files => [
        {
          command: [
            { value: 'mkdir -p example1', hidden: true },
            { value: 'cd example1', hidden: true },
            {
              value: writeFileCommand('index.js', files['indexjs']),
              hidden: true
            },
            { value: 'node index.js' }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            {
              value: `${writeFileCommand('Dockerfile', files['dockerfile'])}`,
              hidden: true
            },
            { value: 'cat Dockerfile' }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            { value: `docker build -t docker-demo .` }
          ]
        },
        {
          command: [
            { value: 'cd example1', hidden: true },
            { value: `docker run --rm docker-demo` }
          ]
        }
      ]
    ),
    dockerPortVolume: new SshBatch({}, _ => [
      {
        command: [{ value: 'docker pull lowet84/k8s2019-port-volume-demo' }]
      },
      {
        command: [
          { value: 'docker rm -f example2 || true', hidden: true },
          {
            value:
              'docker run -d -p 3000:3000 --name example2 lowet84/k8s2019-port-volume-demo'
          }
        ]
      },
      {
        command: [
          { value: 'docker rm -f example2 || true', hidden: true },
          {
            value:
              'docker run -d -p 3000:3000 -v /etc/hostname:/etc/hostname --name example2 lowet84/k8s2019-port-volume-demo'
          }
        ]
      }
    ]),
    kubernetesDeploy: new SshBatch(
      {
        deploy: `
kind: Deployment
apiVersion: extensions/v1beta1
metadata:
  name: demo-deployment
spec:
  replicas: 1
  template:
    metadata:
      labels:
        name: demo-app
    spec:
      containers:
      - image: lowet84/k8s2019-demo:arm
        imagePullPolicy: Always
        name: demo
        volumeMounts:
        - mountPath: /etc/hostname
          name: hostname
      volumes:
      - name: hostname
        hostPath:
          path: /etc/hostname
  `
      },
      files => [
        {
          command: [
            { value: 'mkdir -p example3', hidden: true },
            { value: 'cd example3', hidden: true },
            {
              value: writeFileCommand('deployment.yaml', files['deploy']),
              hidden: true
            },
            { value: 'cat deployment.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            {
              value: 'kubectl delete -f deployment.yaml >/dev/null 2>/dev/null',
              hidden: true
            },
            { value: 'kubectl apply -f deployment.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            { value: 'kubectl get deploy' }
          ]
        }
      ]
    ),
    kubernetesService: new SshBatch(
      {
        service: `
kind: Service
apiVersion: v1
metadata:
  name: demo-service
spec:
  selector:
    name: demo-app
  ports:
    - protocol: TCP
      port: 3000
      name: web
  `
      },
      files => [
        {
          command: [
            { value: 'mkdir -p example3', hidden: true },
            { value: 'cd example3', hidden: true },
            {
              value: writeFileCommand('service.yaml', files['service']),
              hidden: true
            },
            { value: 'cat service.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            {
              value: 'kubectl delete -f service.yaml >/dev/null 2>/dev/null',
              hidden: true
            },
            { value: 'kubectl apply -f service.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            { value: 'kubectl get svc' }
          ]
        }
      ]
    ),
    kubernetesIngress: new SshBatch(
      {
        ingress: `
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: demo-ingress
spec:
  rules:
  - host: ${settings.host}
    http:
      paths:
      - backend:
          serviceName: demo-service
          servicePort: 3000
      
  `
      },
      files => [
        {
          command: [
            { value: 'mkdir -p example3', hidden: true },
            { value: 'cd example3', hidden: true },
            {
              value: writeFileCommand('ingress.yaml', files['ingress']),
              hidden: true
            },
            { value: 'cat ingress.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            {
              value: 'kubectl delete -f ingress.yaml >/dev/null 2>/dev/null',
              hidden: true
            },
            { value: 'kubectl apply -f ingress.yaml' }
          ]
        },
        {
          command: [
            { value: 'cd example3', hidden: true },
            { value: 'kubectl get ing' }
          ]
        }
      ]
    ),
    reset: new SshBatch({}, files => [
      { command: [{ value: 'kubectl get pods ' }] },
      { command: [{ value: 'docker ps' }] },
      { command: [{ value: 'kubectl get all' }] },
      { command: [{ value: 'docker rm -f docker-demo' }] },
      { command: [{ value: 'docker rm -f example2' }] },
      { command: [{ value: 'docker rmi -f docker-demo' }] },
      { command: [{ value: 'kubectl delete ing/demo-ingress' }] },
      { command: [{ value: 'kubectl delete svc/demo-service' }] },
      { command: [{ value: 'kubectl delete deploy/demo-deployment' }] },
      { command: [{ value: 'kubectl get pods ' }] },
    ])
  }
}

export { batches }
