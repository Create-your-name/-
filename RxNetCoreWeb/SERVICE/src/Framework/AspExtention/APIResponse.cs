namespace Arch
{
    public class APIResponse<T>
    {
        public int result;
        public string errorMsg;
        public T data;

        public static implicit operator APIResponse<T>(T result)
        {
            return new APIResponse<T>
            {
                result = ErrorCode.OK,
                data = result
            };
        }

        public static APIResponse<T> Error(int err)
        {
            return new APIResponse<T> { result = err, errorMsg = ErrorCode.CodeToString(err) };
        }
    }

    public class APIResponse : APIResponse<object>
    {
        public static implicit operator APIResponse(int error)
        {
            return new APIResponse
            {
                result = error,
                errorMsg = ErrorCode.CodeToString(error)
            };
        }

        public new static APIResponse Error(int err)
        {
            return new APIResponse { result = err, errorMsg = ErrorCode.CodeToString(err) };
        }

        public static APIResponse OK(object data)
        {
            return new APIResponse { result = ErrorCode.OK, data = data };
        }
    }

}
