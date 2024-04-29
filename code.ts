
if (figma.editorType === 'figma') {
  figma.showUI(__html__);

  figma.ui.onmessage =  (msg: {type: string, count: number}) => {
    if (msg.type === 'create-shapes') {
      console.log('===========');
      const page = figma.currentPage;
      const nodes = page.findAll(node => node.type === 'FRAME');
      console.log(nodes);

      const createNodes: SceneNode[] = [];

      for (let i = 0; i < nodes.length; i++) {
        const nodeFrame = nodes[i];
        console.log(nodeFrame.name);

        (async () => {
          const bytes = await nodeFrame.exportAsync({
            format: 'PNG',
            constraint: { type: 'SCALE', value: 2 },
          })

          const image = figma.createImage(bytes)
          const frame = figma.createFrame()

          frame.x = 200
          frame.y = 250 * i

          frame.resize(200, 200)
          frame.fills = [{
            imageHash: image.hash,
            scaleMode: "FILL",
            scalingFactor: 1,
            type: "IMAGE",
          }]

          createNodes.push(frame);
        })();
      }
      figma.currentPage.selection = createNodes;
      figma.viewport.scrollAndZoomIntoView(createNodes);
    }

    // figma.closePlugin();
  };
}

