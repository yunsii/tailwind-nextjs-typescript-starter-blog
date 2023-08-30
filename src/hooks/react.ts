export function useMountOnce(callback: () => void) {
  const mountedRef = useRef(false)

  useEffect(() => {
    if (mountedRef.current) {
      return
    }
    mountedRef.current = true

    callback()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
