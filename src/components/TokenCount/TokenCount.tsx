import React, { useEffect, useMemo, useState } from 'react';
import useStore from '@store/store';
import { shallow } from 'zustand/shallow';

import countTokens from '@utils/messageUtils';
import { modelCost } from '@constants/chat';

const TokenCount = React.memo(() => {
  const [tokenCount, setTokenCount] = useState<number>(0);
  const generating = useStore((state) => state.generating);
  const messages = useStore(
    (state) =>
      state.chats ? state.chats[state.currentChatIndex].messages : [],
    shallow
  );

  const model = useStore((state) =>
    state.chats
      ? state.chats[state.currentChatIndex].config.model
      : 'yi-6b-chat-w4a16g32'
  );

  const cost = useMemo(() => {
    const currentModelCost = modelCost[model as keyof typeof modelCost];
    if (currentModelCost && currentModelCost.prompt) {
      const price = currentModelCost.prompt.price * (tokenCount / currentModelCost.prompt.unit);
      return price.toPrecision(3);
    }
    return "0";
  }, [model, tokenCount]);
  

  useEffect(() => {
    if (!generating) setTokenCount(countTokens(messages, model));
  }, [messages, generating]);

  return (
    <div className='absolute top-[-16px] right-0'>
      <div className='text-xs italic text-gray-900 dark:text-gray-300'>
        Tokens: {tokenCount} (${cost})
      </div>
    </div>
  );
});

export default TokenCount;
