export const useUser = () => {
    console.log("Request ajax");
    return useState('user', () => 'My User')
  }
  